// ===== MOCK DATA =====
const categories = [
  {
    id: 1,
    icon: "🏰",
    name: "General Discussion",
    description: "Talk about anything RP related",
    threads: 342,
    posts: 4821,
    lastThread: "Welcome to the new era!",
    lastAuthor: "NightWalker",
    lastTime: "2 min ago",
  },
  {
    id: 2,
    icon: "⚔️",
    name: "Character Profiles",
    description: "Create and manage your RP characters",
    threads: 189,
    posts: 2104,
    lastThread: "New character: Shadowmere",
    lastAuthor: "DarkMage",
    lastTime: "15 min ago",
  },
  {
    id: 3,
    icon: "🌙",
    name: "Night City Roleplay",
    description: "The main RP zone — neon lights and dark alleys",
    threads: 567,
    posts: 8932,
    lastThread: "The Heist at Midnight",
    lastAuthor: "CyberGhost",
    lastTime: "1 hr ago",
  },
  {
    id: 4,
    icon: "📜",
    name: "Lore & Worldbuilding",
    description: "Build the world together",
    threads: 98,
    posts: 1456,
    lastThread: "History of the Obsidian Order",
    lastAuthor: "Lorekeeper",
    lastTime: "3 hrs ago",
  },
  {
    id: 5,
    icon: "🎭",
    name: "Events & Quests",
    description: "Server events, quests, and storyline updates",
    threads: 67,
    posts: 890,
    lastThread: "Monthly Tournament — Signups Open!",
    lastAuthor: "EventMaster",
    lastTime: "5 hrs ago",
  },
  {
    id: 6,
    icon: "🎨",
    name: "Art & Creatives",
    description: "Share your RP art, writing, and music",
    threads: 123,
    posts: 1678,
    lastThread: "My character's playlist",
    lastAuthor: "NeonDreams",
    lastTime: "1 day ago",
  },
];

const threads = [
  {
    id: 1,
    pinned: true,
    title: "📋 Forum Rules & Guidelines — Read Before Posting",
    author: "Admin",
    authorRole: "admin",
    avatar: "A",
    tag: "ooc",
    replies: 5,
    views: 12400,
    lastReply: "NightWalker",
    lastTime: "3 days ago",
    content: `<p>Welcome to <strong>NightTime RP Forums</strong>!</p>
<p>Please read these rules before participating:</p>
<p>1. Be respectful to all members<br>
2. Keep RP content in appropriate categories<br>
3. No spamming or self-promotion without permission<br>
4. Use proper RP formatting (italic for thoughts, etc.)<br>
5. Have fun and be creative!</p>
<p><em>— The NightTime Team</em></p>`,
  },
  {
    id: 2,
    pinned: true,
    title: "🌙 Welcome to NightTime RP — New Members Start Here!",
    author: "NightWalker",
    authorRole: "mod",
    avatar: "N",
    tag: "ooc",
    replies: 23,
    views: 8900,
    lastReply: "ShadowSerpent",
    lastTime: "1 hr ago",
    content: `<p>Hey everyone! If you're new here, welcome to the NightTime RP community!</p>
<p>This is a roleplay forum set in a dark, neon-lit urban fantasy world. You can create characters, join ongoing storylines, or start your own adventures.</p>
<p>Check out the <strong>Character Profiles</strong> category to create your first character, and head to <strong>Night City Roleplay</strong> to jump into the action.</p>
<p>Feel free to ask questions — we're a friendly bunch!</p>`,
  },
  {
    id: 3,
    pinned: false,
    title: "The Heist at Midnight — Who's In?",
    author: "CyberGhost",
    authorRole: "member",
    avatar: "C",
    tag: "ic",
    replies: 45,
    views: 1230,
    lastReply: "NeonDreams",
    lastTime: "30 min ago",
    content: `<p>The Obsidian Tower. 47th floor. The target: a data vault containing encrypted files worth more than most people make in a lifetime.</p>
<p>I've scouted the building three times. Security is tight but not impenetrable. I need a team — a hacker, a face, and someone who can handle things if it goes sideways.</p>
<p><em>Who's in?</em></p>
<p>Post your character's skills and why they should be on this crew. I'll be picking the team by end of week.</p>`,
  },
  {
    id: 4,
    pinned: false,
    title: "Monthly Tournament — Signups Open!",
    author: "EventMaster",
    authorRole: "mod",
    avatar: "E",
    tag: "event",
    replies: 18,
    views: 567,
    lastReply: "DarkMage",
    lastTime: "2 hrs ago",
    content: `<p>⚔️ <strong>The NightTime Arena Tournament</strong> is back!</p>
<p>Format: 1v1 elimination bracket<br>
Prizes: Custom roleplay items + bragging rights<br>
Date: Saturday, 8PM UTC</p>
<p>Sign up by replying with your character name and combat class. See you in the arena!</p>`,
  },
  {
    id: 5,
    pinned: false,
    title: "New character: Shadowmere — Assassin turned reluctant hero",
    author: "DarkMage",
    authorRole: "member",
    avatar: "D",
    tag: "ic",
    replies: 12,
    views: 340,
    lastReply: "Lorekeeper",
    lastTime: "4 hrs ago",
    content: `<p><em>Name:</em> Shadowmere<br><em>Class:</em> Rogue / Shadowmancer<br><em>Alignment:</em> Chaotic Neutral</p>
<p>Once the most feared assassin in the Obsidian Syndicate, Shadowmere faked her own death after a job went wrong. Now she hides in the neon-lit streets, trying to atone for her past — one small good deed at a time.</p>
<p>She's sarcastic, distrustful, and absolutely lethal with a blade. But underneath all that, there's someone who still believes redemption is possible.</p>`,
  },
  {
    id: 6,
    pinned: false,
    title: "History of the Obsidian Order — A Lore Deep Dive",
    author: "Lorekeeper",
    authorRole: "member",
    avatar: "L",
    tag: "ic",
    replies: 8,
    views: 210,
    lastReply: "NightWalker",
    lastTime: "6 hrs ago",
    content: `<p>The Obsidian Order was founded over 300 years ago during the First Darkness — a period when the boundary between the mortal world and the Shadow Realm nearly collapsed.</p>
<p>Originally a coalition of mages and warriors, the Order was tasked with maintaining the wards that keep the Shadow Realm at bay. Over centuries, they grew into a powerful political entity, controlling much of Night City from the shadows.</p>
<p>Today, the Order is fractured. Some remain faithful to the original mission, while others have succumbed to corruption and power. The question is: <em>which faction will shape Night City's future?</em></p>`,
  },
];

const onlineUsers = [
  { name: "NightWalker", role: "Admin", avatar: "N" },
  { name: "DarkMage", role: "Mod", avatar: "D" },
  { name: "CyberGhost", role: "Member", avatar: "C" },
  { name: "NeonDreams", role: "Member", avatar: "E" },
  { name: "ShadowSerpent", role: "Member", avatar: "S" },
  { name: "Lorekeeper", role: "Member", avatar: "L" },
];

const activities = [
  { user: "CyberGhost", action: "posted in", target: "The Heist at Midnight", time: "2m ago" },
  { user: "NeonDreams", action: "replied to", target: "Monthly Tournament", time: "5m ago" },
  { user: "ShadowSerpent", action: "created", target: "New character thread", time: "12m ago" },
  { user: "DarkMage", action: "posted in", target: "Character Profiles", time: "18m ago" },
  { user: "Lorekeeper", action: "updated", target: "Obsidian Order lore", time: "30m ago" },
];

// ===== RENDER FUNCTIONS =====

function createStars() {
  const container = document.querySelector(".stars");
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", 2 + Math.random() * 4 + "s");
    star.style.animationDelay = Math.random() * 3 + "s";
    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    container.appendChild(star);
  }
}

function renderCategories() {
  const list = document.getElementById("category-list");
  if (!list) return;
  list.innerHTML = categories
    .map(
      (c) => `
    <a href="category.html?id=${c.id}" class="category-card" style="text-decoration:none;color:inherit;">
      <div class="category-icon">${c.icon}</div>
      <div class="category-info">
        <h3>${c.name}</h3>
        <p>${c.description}</p>
      </div>
      <div class="category-stats">
        <div class="stat">
          <span class="stat-num">${c.threads}</span>
          <span class="stat-label">Threads</span>
        </div>
        <div class="stat">
          <span class="stat-num">${c.posts.toLocaleString()}</span>
          <span class="stat-label">Posts</span>
        </div>
      </div>
      <div class="category-last-post">
        <div class="thread-title">${c.lastThread}</div>
        <div class="thread-meta">by ${c.lastAuthor} · ${c.lastTime}</div>
      </div>
    </a>`
    )
    .join("");
}

function renderThreads() {
  const list = document.getElementById("thread-list");
  if (!list) return;
  const categoryId = new URLSearchParams(window.location.search).get("id");
  const filtered = categoryId
    ? threads.filter((_, i) => i < 4)
    : threads;

  list.innerHTML = filtered
    .map(
      (t) => `
    <a href="thread.html?id=${t.id}" class="thread-item ${t.pinned ? "pinned" : ""}" style="text-decoration:none;color:inherit;">
      <div class="thread-avatar">
        <div class="avatar">${t.avatar}</div>
      </div>
      <div class="thread-content">
        <h3>${t.pinned ? "📌 " : ""}${t.title}</h3>
        <div class="thread-meta">
          by <span class="author">${t.author}</span> · ${t.tag.toUpperCase()} · Last reply by ${t.lastReply} · ${t.lastTime}
        </div>
      </div>
      <div class="thread-tags">
        <span class="tag tag-${t.tag}">${t.tag}</span>
      </div>
      <div class="thread-stats">
        <div class="stat">
          <span class="stat-num">${t.replies}</span>
          <span class="stat-label">Replies</span>
        </div>
        <div class="stat">
          <span class="stat-num">${t.views.toLocaleString()}</span>
          <span class="stat-label">Views</span>
        </div>
      </div>
    </a>`
    )
    .join("");
}

function renderThread() {
  const header = document.getElementById("thread-header");
  const postList = document.getElementById("post-list");
  if (!header || !postList) return;

  const id = parseInt(new URLSearchParams(window.location.search).get("id") || "1");
  const thread = threads.find((t) => t.id === id) || threads[0];

  header.innerHTML = `
    <h1>${thread.title}</h1>
    <div class="meta">
      <span>Started by <strong style="color:var(--accent-light)">${thread.author}</strong></span>
      <span>·</span>
      <span>${thread.tag.toUpperCase()}</span>
      <span>·</span>
      <span>${thread.views.toLocaleString()} views</span>
    </div>
  `;

  const replies = [
    thread,
    {
      author: "DarkMage",
      avatar: "D",
      role: "member",
      joined: "Jan 2024",
      posts: 234,
      content: thread.content,
      date: "Today at 2:30 PM",
    },
    {
      author: "NeonDreams",
      avatar: "E",
      role: "member",
      joined: "Mar 2024",
      posts: 156,
      content: `<p>I'm in! My character specializes in infiltration and disguise. NeonDreams — a face man with connections all over the lower district.</p>
<p><em>"I know a guy who knows a guy. That's all you need to know."</em></p>`,
      date: "Today at 2:45 PM",
    },
    {
      author: "ShadowSerpent",
      avatar: "S",
      role: "member",
      joined: "Jun 2024",
      posts: 89,
      content: `<p>Count me in too. I'm a shadow-weaver — can create illusions and darken entire rooms. Good for distractions.</p>`,
      date: "Today at 3:12 PM",
    },
  ];

  postList.innerHTML = replies
    .map(
      (p, i) => `
    <div class="post-card" style="animation-delay:${i * 0.1}s">
      <div class="post-sidebar">
        <div class="avatar avatar-lg">${p.avatar}</div>
        <div class="username">${p.author}</div>
        ${p.role === "admin"
          ? '<span class="role admin">Admin</span>'
          : p.role === "mod"
          ? '<span class="role mod">Moderator</span>'
          : ""}
        <div class="joined">Joined: ${p.joined || "Jan 2024"}</div>
        <div class="posts-count">Posts: ${p.posts || 1}</div>
      </div>
      <div class="post-body">
        <div class="post-content">${p.content}</div>
        <div class="post-footer">
          <span class="post-date">${p.date}</span>
          <div class="post-actions">
            <button onclick="alert('Liked!')">👍 Like</button>
            <button onclick="alert('Reply feature coming soon!')">💬 Reply</button>
            <button onclick="alert('Quote feature coming soon!')">📝 Quote</button>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");
}

function renderProfile() {
  const header = document.getElementById("profile-header");
  const statsGrid = document.getElementById("profile-stats");
  const recentPosts = document.getElementById("recent-posts");
  if (!header) return;

  const name = new URLSearchParams(window.location.search).get("user") || "NightWalker";
  const profile = {
    NightWalker: { role: "admin", bio: "Forum founder. Keeper of the Night.", joined: "Jan 2024", posts: 1567, threads: 89, reputation: 4200 },
    CyberGhost: { role: "member", bio: "Ghost in the machine. Hacker. Thief. Reluctant hero.", joined: "Feb 2024", posts: 892, threads: 45, reputation: 1800 },
    DarkMage: { role: "mod", bio: "Weaving shadows since the First Darkness.", joined: "Mar 2024", posts: 1234, threads: 67, reputation: 3100 },
  };

  const p = profile[name] || profile.NightWalker;
  const initials = name.charAt(0).toUpperCase();

  header.innerHTML = `
    <div class="avatar avatar-xl">${initials}</div>
    <div class="profile-info">
      <h1>${name}</h1>
      <span class="role-badge ${p.role}">${p.role}</span>
      <p class="bio">${p.bio}</p>
      <div class="profile-meta">
        <span>📅 Joined ${p.joined}</span>
        <span>📍 Night City</span>
        <span>🟢 Online</span>
      </div>
    </div>
  `;

  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="profile-stat-card"><div class="num">${p.posts}</div><div class="label">Posts</div></div>
      <div class="profile-stat-card"><div class="num">${p.threads}</div><div class="label">Threads</div></div>
      <div class="profile-stat-card"><div class="num">${p.reputation}</div><div class="label">Reputation</div></div>
      <div class="profile-stat-card"><div class="num">${Math.floor(p.posts / 10)}</div><div class="label">Likes</div></div>
    `;
  }

  if (recentPosts) {
    const userThreads = threads.filter((t) => t.author === name || Math.random() > 0.5).slice(0, 3);
    recentPosts.innerHTML = userThreads
      .map(
        (t) => `
      <a href="thread.html?id=${t.id}" class="thread-item" style="text-decoration:none;color:inherit;">
        <div class="thread-content">
          <h3>${t.title}</h3>
          <div class="thread-meta">${t.lastTime} · ${t.replies} replies</div>
        </div>
      </a>
    `
      )
      .join("");
  }
}

function renderOnlineUsers() {
  const container = document.getElementById("online-users");
  if (!container) return;
  container.innerHTML = onlineUsers
    .map(
      (u) => `
    <a href="profile.html?user=${u.name}" class="online-user" style="text-decoration:none;color:inherit;">
      <div class="avatar avatar-sm">${u.avatar}<div class="status-dot"></div></div>
      <span class="name">${u.name}</span>
    </a>
  `
    )
    .join("");
}

function renderActivity() {
  const container = document.getElementById("recent-activity");
  if (!container) return;
  container.innerHTML = activities
    .map(
      (a) => `
    <div class="activity-item">
      <span class="time">${a.time}</span>
      <span><strong>${a.user}</strong> ${a.action} <em>${a.target}</em></span>
    </div>
  `
    )
    .join("");
}

// ===== AUTH (mock) =====
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email")?.value;
  if (email) {
    window.location.href = "index.html";
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name")?.value;
  if (name) {
    window.location.href = "index.html";
  }
}

// ===== NAV HIGHLIGHTING =====
function highlightNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  renderCategories();
  renderThreads();
  renderThread();
  renderProfile();
  renderOnlineUsers();
  renderActivity();
  highlightNav();
});
