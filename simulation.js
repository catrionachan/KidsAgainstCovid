var people = []

function Person(id, age, socialDistancingObedience, underlyingCondition) {
    this.id = id;
    this.age = age;
    this.socialDistancingObedience = socialDistancingObedience;
    this.underlyingCondition = underlyingCondition;
}

for (var i = 0; i < 100; i++) {
    people[i] = new Person(i, Math.floor(Math.random()*100), Math.random(), false);
    if (Math.random() <= 0.05) people[i].underlyingCondition = true;
}

console.log(people);