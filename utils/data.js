const names = ['Nayeon', 'Jeongyeon', 'Momo', 'Sana', 'Jihyo', 'Mina'
    , 'Dahyun', 'Chaeyoung', 'Tzuyu'];

// Generate a random username
const getRandomUsername =  () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];

    //validates the username
    const formattedUsername = randomName.toLowerCase().replace(/\s+/g, '');
    return formattedUsername;
}
  
  // Generate a random email
  const getRandomEmail = (username) => `${username.toLowerCase()}@example.com`;
  
  // Generate a random thought
  const getRandomThought = () => {
    const thoughts = [
      "One in a Million.",
      "Hi, we are TWICE.",
      "So hot. So hot.",
      "I am the wonderful leader Jihyo.",
      "Dubububububu.",
    ];
    const randomIndex = Math.floor(Math.random() * thoughts.length);
    return thoughts[randomIndex];
  };
  
// Generate an array of random usernames
const getRandomUsernames = (count) => {
    const usernames = [];
    for(let i = 0; i < count; i++){
        //Append unique identifier
        usernames.push(getRandomUsername() + i);
    } 
    return usernames;
};
  
  // Generate an array of random emails
  const getRandomEmails = (usernames) => {
    return usernames.map(username => getRandomEmail(username));
  };
  
  module.exports = {
    getRandomUsernames,
    getRandomEmails,
    getRandomThought,
  };
