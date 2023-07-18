<script lang="ts">
</script>

<pre class="language-svelte" data-highlight="10,12">
<code>
{`<div></div>`}
</code>
</pre>

<pre class="language-svelte" data-highlight="10,12">
<code>
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

<pre class="language-treeview mt-8">
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
