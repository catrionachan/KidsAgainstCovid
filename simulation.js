var fs = require('fs');

//SETUP//
fs.writeFile('results.txt', '', function(err){
    if (err) console.log(err);
});
fs.writeFile('results.csv', 'day,susceptible,infected,recovered,dead,shopped\n', function(err){
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
nHomes = 40;

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
            chance += 0.01;
            if (this.tSinceInfection >= 6) chance += 0.03;
            if (this.tSinceInfection >= 11) chance += 0.05;
        }
        else if (age < 80 && age >= 70) {
            chance += 0.0075;
            if (this.tSinceInfection >= 6) chance += 0.025;
            if (this.tSinceInfection >= 11) chance += 0.0425;
        }
        else if (age < 70 && age >= 60) {
            chance += 0.005;
            if (this.tSinceInfection >= 10) chance += 0.015;
            if (this.tSinceInfection >= 20) chance += 0.025;
        }
        else if (age < 60 && age >= 50) {
            chance += 0.00125;
            if (this.tSinceInfection >= 10) chance += 0.005;
            if (this.tSinceInfection >= 20) chance += 0.00875;
        }
        else chance += 0.001;
        if (this.underlyingCondition) chance += 0.5;
        return chance;
    }

    this.getRecoveryChance = function() {
        var chance = 0;
        if (this.tSinceInfection >= 21) chance += 0.35;
        else if (this.tSinceInfection >= 18) chance += 0.25;
        else if (this.tSinceInfection >= 14) chance += 0.15;
        else if (this.tSinceInfection >= 10) chance += 0.1;
        return chance;
    }
}

for (var i = 0; i < population; i++) {
    people[i] = new Person(i, false, 0, false, false, false, locations.HOME, false, null, Math.floor(Math.random()*99+1), Math.random(), false);
    for (h of homes) {
        if (h.currentPeople < h.maxPeople) {
            people[i].home = h;
            h.currentPeople++;
            break;
        }
    }
    if (Math.random() <= 0.03) people[i].underlyingCondition = true;
}

console.log(people);

//SIMULATION//
nDays = 50;

people[0].infected = true;

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
        if ((Math.random() <= 0.3*(1 - p.socialDistancingObedience) && !p.justShopped && !p.symptomatic) || (Math.random() <= 0.3*(1 - p.socialDistancingObedience && p.recovered))) {
            if (!p.dead) p.location = locations.GROCERY_STORE, shopped++;
        }
        if (p.infected && p.location == locations.GROCERY_STORE && !p.dead) groceryInfectionChance += 0.5;
    }
    for (p of people) {
        if (p.location == locations.GROCERY_STORE && !p.dead && !p.recovered) if (Math.random() <= groceryInfectionChance) p.infected = true;
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
        sb+="\nday " + i;
        sb+="\nsusceptible " + susceptible;
        sb+="\ninfected " + infected;
        sb+="\nrecovered " + recovered;
        sb+="\ndead " + dead;
        sb+="\nshopped " + shopped;
    txtWrite('results.txt', sb);
    
    sb = i + "," + susceptible + "," + infected + "," + recovered + "," + dead + "," + shopped;
    csvWrite('results.csv', sb);
    console.log("\nday " + i);
    console.log("susceptible " + susceptible);
    console.log("infected " + infected);
    console.log("recovered " + recovered);
    console.log("dead " + dead);
    console.log("shopped " + shopped);
}

console.log(people);

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