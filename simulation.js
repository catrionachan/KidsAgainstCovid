var fs = require('fs');

//SETUP//
fs.writeFile('results.txt', '', function(err){
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
}

for (var i = 0; i < population; i++) {
    people[i] = new Person(i, false, 0, false, false, false, locations.HOME, false, null, Math.floor(Math.random()*100), Math.random(), false);
    for (var j = 0; j < nHomes; j++) {
        if (homes[j].currentPeople < homes[j].maxPeople) {
            people[i].home = homes[j];
            homes[j].currentPeople++;
            break;
        }
    }
    if (Math.random() <= 0.05) people[i].underlyingCondition = true;
}

console.log(people);

//SIMULATION//
nDays = 50;

people[0].infected = true;

//each day
for (var i = 1; i <= nDays; i++) {
    //general
    for (var j = 0; j < people.length; j++) {
        if (people[j].tSinceInfection >= 15) people[j].infected = false, people[j].recovered = true;
        else if (people[j].tSinceInfection >= 5) people[j].symptomatic = true;
        if (people[j].infected) people[j].tSinceInfection++;
    }

    //grocery store
    groceryInfectionChance = 0;
    shopped = 0;
    for (var j = 0; j < people.length; j++) {
        if ((Math.random() <= 0.3*(1 - people[j].socialDistancingObedience) && !people[j].justShopped && !people[j].symptomatic) || (Math.random() <= 0.3*(1 - people[j].socialDistancingObedience && people[j].recovered))) {
            people[j].location = locations.GROCERY_STORE, shopped++;
        }
        if (people[j].infected && people[j].location == locations.GROCERY_STORE) groceryInfectionChance += 0.5;
    }
    for (var j = 0; j < people.length; j++) {
        if (people[j].location == locations.GROCERY_STORE) if (Math.random() <= groceryInfectionChance) people[j].infected = true;
    }
    for (var j = 0; j < people.length; j++) {
        people[j].location = locations.HOME;
    }

    //home

    //output
    infected = 0;
    recovered = 0;
    dead = 0;
    for (var j = 0; j < people.length; j++) {
        if (people[j].infected) infected++;
        if (people[j].recovered) recovered++;
        if (people[j].dead) dead++;
    }
    var sb = "";
        sb+="\nday " + i;
        sb+="\ninfected " + infected;
        sb+="\nrecovered " + recovered;
        sb+="\ndead " + dead;
        sb+="\nshopped " + shopped;

    fileWrite2('results.txt', sb);
    console.log("\nday " + i);
    console.log("infected " + infected);
    console.log("recovered " + recovered);
    console.log("dead " + dead);
    console.log("shopped " + shopped);
}

//console.log(people);

function fileWrite2(savePath, sb) {
    setTimeout(() => {
        fs.appendFile(savePath, sb + "\n", function(err) {
            if (err) throw err;
        });
    }, 1000);
}