var fs = require('fs');

//SETUP//
fs.writeFile('results.txt', '', function(err) {
    if (err) console.log(err);
});
fs.writeFile('results.csv', 'day,susceptible,infected,recovered,dead,shopped\n', function(err) {
    if (err) console.log(err);
});

const locations = {
    HOME: 'home',
    GROCERY_STORE: 'grocery store'
}

//HOMES//
var homes = []

function Home(id, maxPeople, currentPeople) {
    this.id = id;
    this.maxPeople = maxPeople;
    this.currentPeople = currentPeople;
}

population = 0;
nHomes = 1000;

for (var i = 0; i < nHomes; i++) {
    homes[i] = new Home(i, -1, 0);
    maxPeopleDecider = Math.random();
    if (maxPeopleDecider <= 0.2837) homes[i].maxPeople = 1;
    if (maxPeopleDecider > 0.2837 && maxPeopleDecider <= 0.6288) homes[i].maxPeople = 2;
    if (maxPeopleDecider > 0.6288 && maxPeopleDecider <= 0.7795) homes[i].maxPeople = 3;
    if (maxPeopleDecider > 0.7795 && maxPeopleDecider <= 0.9071) homes[i].maxPeople = 4;
    if (maxPeopleDecider > 0.9071 && maxPeopleDecider <= 0.9649) homes[i].maxPeople = 5;
    if (maxPeopleDecider > 0.9649 && maxPeopleDecider <= 1) homes[i].maxPeople = 6;
    population += homes[i].maxPeople;
}

console.log(homes);
console.log("pop: " + population);

//PEOPLE//
//TODO: proper age distribution

var people = []

function Person(id, infected, tSinceInfection, symptomatic, recovered, dead, location, justShopped, home, age, socialDistancingObedience, underlyingCondition) {
    this.id = id;
    this.infected = infected;
    this.tSinceInfection = tSinceInfection;
    this.symptomatic = symptomatic;
    this.recovered = recovered;
    this.dead = dead;
    this.location = location;
    this.justShopped = justShopped;
    this.home = home;
    this.age = age;
    this.socialDistancingObedience = socialDistancingObedience;
    this.underlyingCondition = underlyingCondition;

    this.getDeathChance = function() {
        var chance = 0;
        if (age >= 80) {
            chance += 0.0065;
            if (this.tSinceInfection >= 6) chance += 0.01;
            if (this.tSinceInfection >= 11) chance += 0.02;
        } else if (age < 80 && age >= 70) {
            chance += 0.004;
            if (this.tSinceInfection >= 6) chance += 0.0055;
            if (this.tSinceInfection >= 11) chance += 0.0075;
        } else if (age < 70 && age >= 60) {
            chance += 0.0005;
            if (this.tSinceInfection >= 6) chance += 0.002;
            if (this.tSinceInfection >= 11) chance += 0.0035;
        } else if (age < 60 && age >= 40) {
            chance += 0.00000001;
            if (this.tSinceInfection >= 10) chance += 0.00000001;
            if (this.tSinceInfection >= 20) chance += 0.00000002;
        }
        if (this.underlyingCondition) chance += 0.5;
        return chance;
    }

    this.getRecoveryChance = function() {
        var chance = 0;
        if (this.tSinceInfection >= 21) chance += 0.4;
        else if (this.tSinceInfection >= 18) chance += 0.3;
        else if (this.tSinceInfection >= 14) chance += 0.25;
        else if (this.tSinceInfection >= 10) chance += 0.2;
        return chance;
    }
}

for (var i = 0; i < population; i++) {
    people[i] = new Person(i, false, 0, false, false, false, locations.HOME, false, null, Math.floor(Math.random() * 99 + 1), Math.random(), false);
    for (h of homes) {
        if (h.currentPeople < h.maxPeople) {
            people[i].home = h;
            h.currentPeople++;
            break;
        }
    }
    if (Math.random() <= 0.01 && people[i].age >= 40) people[i].underlyingCondition = true;
    else if (Math.random() <= 0.002 && people[i].age < 40) people[i].underlyingCondition = true;
}

console.log(people);

//SIMULATION//
nDays = 100;

people[0].infected = true;
people[1].infected = true;

//each day
for (var i = 1; i <= nDays; i++) {
    //general
    for (p of people) {
        if (Math.random() <= p.getDeathChance() && p.infected && !p.dead) p.infected = false, p.dead = true;
        if (Math.random() <= p.getRecoveryChance() && p.infected && !p.dead) p.infected = false, p.recovered = true;
        else if (p.tSinceInfection >= 5) p.symptomatic = true;
        if (p.infected) p.tSinceInfection++;
    }

    //grocery store
    groceryInfectionChance = 0;
    shopped = 0;
    for (p of people) {
        if ((Math.random() <= 0.3 * (1 - p.socialDistancingObedience) && !p.justShopped && !p.symptomatic) || (Math.random() <= 0.3 * (1 - p.socialDistancingObedience && p.recovered))) {
            if (!p.dead) p.location = locations.GROCERY_STORE, shopped++;
        }
        if (p.infected && p.location == locations.GROCERY_STORE && !p.dead) groceryInfectionChance += 0.5;
    }
    for (p of people) {
        if (p.location == locations.GROCERY_STORE && !p.dead && !p.recovered)
            if (Math.random() <= groceryInfectionChance) p.infected = true;
    }
    for (p of people) {
        p.location = locations.HOME;
    }

    //home


    //output
    infected = 0;
    recovered = 0;
    dead = 0;
    for (p of people) {
        if (p.infected) infected++;
        if (p.recovered) recovered++;
        if (p.dead) dead++;
    }
    susceptible = population - infected - recovered - dead;
    var sb = "";
    sb += "\nday " + i;
    sb += "\nsusceptible " + susceptible;
    sb += "\ninfected " + infected;
    sb += "\nrecovered " + recovered;
    sb += "\ndead " + dead;
    sb += "\nshopped " + shopped;
    txtWrite('results.txt', sb);

    sb = i + "," + susceptible + "," + infected + "," + recovered + "," + dead + "," + shopped;
    csvWrite('results.csv', sb);
    // console.log("\nday " + i);
    // console.log("susceptible " + susceptible);
    // console.log("infected " + infected);
    // console.log("recovered " + recovered);
    // console.log("dead " + dead);
    // console.log("shopped " + shopped);
}

console.log(people);

var eightsandold = 0,
    sixsevens = 0,
    fourfives = 0,
    twothrees = 0;
var deightsandold = 0,
    dsixsevens = 0,
    dfourfives = 0,
    dtwothrees = 0;

for (p of people) {
    if (p.age >= 80) {
        eightsandold++;
        if (p.dead) deightsandold++;
    } else if (p.age < 80 && p.age >= 60) {
        sixsevens++
        if (p.dead) dsixsevens++;
    } else if (p.age < 60 && p.age >= 40) {
        fourfives++;
        if (p.dead) dfourfives++;
    } else if (p.age < 40 && p.age >= 20) {
        twothrees++;
        if (p.dead) dtwothrees++;
    }
}

console.log(deightsandold / eightsandold);
console.log(dsixsevens / sixsevens);
console.log(dfourfives / fourfives);
console.log(dtwothrees / twothrees);

function txtWrite(savePath, sb) {
    setTimeout(() => {
        fs.appendFile(savePath, sb + "\n", function(err) {
            if (err) throw err;
        });
    }, 1000);
}

function csvWrite(savePath, sb) {
    setTimeout(() => {
        fs.appendFile(savePath, sb + "\n", function(err) {
            if (err) throw err;
        });
    }, 1000);
}