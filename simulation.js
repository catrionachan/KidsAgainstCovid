//SETUP//
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

function Person(id, location, home, age, socialDistancingObedience, underlyingCondition) {
    this.id = id;
    this.location = location;
    this.home = home;
    this.age = age;
    this.socialDistancingObedience = socialDistancingObedience;
    this.underlyingCondition = underlyingCondition;
}

for (var i = 0; i < population; i++) {
    people[i] = new Person(i, locations.HOME, null, Math.floor(Math.random()*100), Math.random(), false);
    for (var j = 0; j < nHomes; j++) {
        if (homes[j].currentPeople != homes[j].maxPeople) {
            console.log("test");
            people[i].home = homes[j];
            homes[j].currentPeople++;
            break;
        }
    }
    if (Math.random() <= 0.05) people[i].underlyingCondition = true;
}

console.log(people);