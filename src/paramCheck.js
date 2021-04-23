// if (window.location.hash.length === 0) {
//   window.location.replace(
//     "https://discord.com/oauth2/authorize?client_id=447809656652562433&redirect_uri=https%3A%2F%2Fitsrauf.github.io%2Fguildcount%2F&response_type=token&scope=guilds%20identify&prompt=none"
//   );
// }

if (window.location.hash.length === 0) {
  window.location.replace(
    `https://discord.com/oauth2/authorize?client_id=447809656652562433&redirect_uri=${encodeURIComponent(
      "http://localhost:8080/"
    )}&response_type=token&scope=guilds%20identify&prompt=none`
  );
}
