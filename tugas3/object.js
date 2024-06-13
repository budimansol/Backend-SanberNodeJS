let person={
    name: 'John',
    age: 30,
    occupation: "Developer"
};

let people = [
    {
        name: 'Budi',
        age: 20
    },
    {
        name: 'Dzakky',
        age: 20
    },
    {
        name: 'Iman',
        age: 30
    }
]

let filtered = people.filter(people => people.age >25);
console.log(filtered);