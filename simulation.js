//PEOPLE//
var people = []

function Person(id, location, age, socialDistancingObedience, underlyingCondition) {
    this.id = id;
    this.location = location;
    this.age = age;
    this.socialDistancingObedience = socialDistancingObedience;
    this.underlyingCondition = underlyingCondition;
}

for (var i = 0; i < 100; i++) {
    people[i] = new Person(i, Math.floor(Math.random()*100), Math.random(), false);
    if (Math.random() <= 0.05) people[i].underlyingCondition = true;
}

console.log(people);

//HOMES//
var homes = []

function Home(id, nPeople) {
    this.id = id;
    this.nPeople = nPeople;
}

for (var i = 0; i < 20; i++) {
    homes[i] = new Home(i, -1);
    nPeopleDecider = Math.random();
    if (nPeopleDecider <= 0.2837) homes[i].nPeople = 1;
    if (nPeopleDecider > 0.2837 && nPeopleDecider <= 0.6288) homes[i].nPeople = 2;
    if (nPeopleDecider > 0.6288 && nPeopleDecider <= 0.7795) homes[i].nPeople = 3;
    if (nPeopleDecider > 0.7795 && nPeopleDecider <= 0.9071) homes[i].nPeople = 4;
    if (nPeopleDecider > 0.9071 && nPeopleDecider <= 0.9649) homes[i].nPeople = 5;
    if (nPeopleDecider > 0.9649 && nPeopleDecider <= 1) homes[i].nPeople = 6;
}

console.log(homes);