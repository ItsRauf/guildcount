if (window.location.hash.length === 0) {
  window.location.replace(
    `https://discord.com/oauth2/authorize?client_id=447809656652562433&redirect_uri=${encodeURIComponent(
      "http://itsrauf.github.io/guildcount/"
    )}&response_type=token&scope=guilds%20identify&prompt=none`
  );
}
