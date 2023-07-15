<script lang="ts">
    let n = 'mark';
    console.log(n);
</script>

<!-- <p class="md:w-2/3">
    Welcome to my development blog! I'm a hobbyist software developer from
    Dallas, TX looking to get involved in the community. I love exploring new
    tech, finding new ways to automate everything, and tinkering with my homelab
    / website.
</p> -->

<!-- <RecentPosts /> -->
<pre class="language-svelte"><code>
{`
<script lang="ts">
    import RecentPosts from '$lib/components/RecentPosts.svelte';

    interface Post {
        title: string;
        date: string;
        slug: string;
        excerpt: string;
        tags: string[];
    }

    // Example js comment
    const posts: Post[] = [
        {
            title: 'My First Post',
            date: '2021-08-01',
            slug: 'test-1',
            excerpt: 'test-1',
            tags: ['js', 'css']
        },
        {
            title: 'My Second Post',
            date: '2021-08-02',
            slug: 'test-2',
            excerpt: 'test-2',
            tags: ['tailwind', 'svelte']
        }
    ]
    
    console.log(posts);

    function sayHello(name: string) {
        console.log('Hello ' + name);
    }
<\/script>

<!-- example html comment -->
<p class="md:w-2/3">
    Do id id anim duis. Adipisicing elit elit elit magna do occaecat 
    proident irure. Et veniam incididunt dolor dolore officia amet 
    est ex irure voluptate magna anim et cillum. 
</p>

<RecentPosts bind:posts/>

<style>
    /* example css comment */
    .test {
        padding: 0px;
    }
    div {
        color: red;
    }
</style>
`}
</code></pre>

<pre class="language-treeview">
<code>
{`
├── static/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── app-window-duotone.svg
│   ├── apple-touch-icon.png
│   ├── brand-ico.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── favicon.png
│   ├── icons/
│   │   ├── blog-0.0.7.svg
│   │   ├── blog.afdesign
│   │   └── brand.svg
│   ├── site.webmanifest
│   └── svelte.config.js
├── svelte.config.js
├── tailwind.config.cjs
├── tsconfig.json
└── vite.config.ts
`}
</code>
</pre>
