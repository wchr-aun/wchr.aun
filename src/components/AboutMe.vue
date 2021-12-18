<template>
	<div class="pb-4">
		<router-link class="uppercase text-2xl font-bold" to="#aboutme"> # About Me </router-link>
	</div>
	<p class="text-center text-xl font-extrabold">Welcome to my personal site.<br /><br /></p>
	<p class="text-center text-lg">
		My name is Watcharin Sirinaovakul. You can also call me <span class="font-extrabold">Aun</span>,
		it is my nickname.
	</p>
	<br />
	<p class="text-center text-lg">
		I'm a postgraduate student at the University of Edinburgh pursuing an MSc in Computer
		Science.<br />
		Have worked in web development on both large and small projects.
	</p>
	<br /><br />
	<p class="text-center text-xs">
		This website is built by
		<ExternalLink link="https://v3.vuejs.org/" text="Vue 3"></ExternalLink>
		,
		<ExternalLink link="https://tailwindcss.com/" text="TailwindCSS"></ExternalLink>
		,
		<ExternalLink link="https://www.svgbackgrounds.com/" text="SVGBackgrounds"></ExternalLink>
		and
		<ExternalLink link="https://fontawesome.com/" text="FontAwesome"></ExternalLink>.<br />
		Hosting on
		<ExternalLink link="https://vercel.com/" text="Vercel"></ExternalLink>
		and
		<ExternalLink link="https://www.cloudflare.com/" text="Cloudflare"></ExternalLink>
		as a DNS.<br /><br />
		<!-- The backend is built by
		<a class="font-extrabold" href="https://golang.org/" target="_blank">GoLang</a> and
		<a class="font-extrabold" href="https://github.com/99designs/gqlgen" target="_blank">
			gqlgen (99designs/gqlgen)
		</a>
		<br />
		Hosting on <a class="font-extrabold" href="https://google.com/" target="_blank">Heroku</a> and
		<a class="font-extrabold" href="https://www.cloudflare.com/" target="_blank">Cloudflare</a> as a
		DNS.<br /><br />
		Last but not least,
		<a class="font-extrabold" href="https://fauna.com/" target="_blank">Fauna</a> is used as
		multi-model database. -->
	</p>
</template>

<script>
import ExternalLink from '@/components/ExternalLink.vue';
export default {
	components: { ExternalLink }
};
</script>
