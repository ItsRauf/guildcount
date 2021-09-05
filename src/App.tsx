import { Component, createSignal, onMount, Show } from "solid-js";

async function getUser(token: string) {
  const userData = await fetch("https://discord.com/api/v9/users/@me", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Authorization: token,
    },
  });
  const user = await userData.json();
  return user;
}

async function getGuilds(after = 0, token: string) {
  const guildData = await fetch(
    `https://discord.com/api/v9/users/@me/guilds?after=${after}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: token,
      },
    }
  );
  const guilds = await guildData.json();
  if (guilds.length === 100) {
    guilds.concat(await getGuilds(guilds[99].id, token));
  }
  return guilds;
}

const App: Component = () => {
  const [user, setUser] = createSignal<Record<string, string>>({});
  const [loaded, setLoaded] = createSignal(false);
  const [loadingText, setLoadingText] = createSignal("");

  onMount(async () => {
    if (window.location.hash.length === 0) {
      window.location.replace(
        `https://discord.com/oauth2/authorize?client_id=447809656652562433&redirect_uri=${encodeURIComponent(
          "https:/itsrauf.github.io/guildcount/"
        )}&response_type=token&scope=guilds%20identify&prompt=none`
      );
    } else {
      const hash = window.location.hash.substr(1);
      const values: Record<string, string> = hash
        .split("&")
        .reduce((result, item) => {
          const parts = item.split("=");
          result[parts[0]] = parts[1];
          return result;
        }, {});

      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
      setLoadingText("Fetching User...");
      const u = await getUser(`${values.token_type} ${values.access_token}`);
      setLoadingText("Fetching Servers...");
      const g = await getGuilds(
        0,
        `${values.token_type} ${values.access_token}`
      );
      u.guildcount = g.length;
      setUser(u);
      setLoaded(true);
    }
  });

  return (
    <div class="flex flex-col min-h-screen font-sans text-white bg-blurple dark:bg-notQuiteBlack">
      <Show
        when={loaded()}
        fallback={
          <main class="container flex flex-col items-center flex-grow min-w-full m-0 place-content-center">
            <h3 className="text-3xl">{loadingText()}</h3>
          </main>
        }
      >
        <main class="container flex flex-col items-center flex-grow min-w-full m-0 place-content-center">
          <img
            id="avatar"
            class="mb-8 rounded-full"
            src={`https://cdn.discordapp.com/avatars/${user().id}/${
              user().avatar
            }?size=256`}
          />
          <h3 class="text-3xl" id="user">
            Hello {user().username}#{user().discriminator}
          </h3>
          <h5 class="text-xl">
            You are in <b id="count">{user().guildcount}</b> guilds
          </h5>
        </main>
      </Show>
      <footer class="container flex flex-row items-center justify-center h-12 min-w-full m-0 space-x-4 text-white bg-notQuiteBlack dark:bg-blurple place-content-center">
        <a href="privacy-policy"> Privacy Policy </a>
        <a href="https://github.com/ItsRauf/guildcount/"> Github Repo </a>
      </footer>
    </div>
  );
};

export default App;
