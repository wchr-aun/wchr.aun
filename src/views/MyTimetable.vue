<template>
	<div class="text-right">
		<a :href="timetableUrl">Go To Full Page</a>
	</div>
	<iframe :src="timetableUrl" style="height: 85vh" width="100%" frameborder="0"></iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	data() {
		return {
			timetableUrl:
				'https://browser.ted.is.ed.ac.uk/generate?courses[]=INFR11077_SS1_SB5%20&courses[]=INFR11136_SS1_SEM1&courses[]=INFR11147_SS1_SEM2&courses[]=INFR11010_SV1_SEM2&courses[]=INFR11023_SV1_SEM2&courses[]=INFR11161_SV1_SEM1&courses[]=INFR11145_SV1_YR&courses[]=INFR11088_SV1_SEM1&courses[]=INFR11098_SV1_SEM2&courses[]=INFR11125_SV1_SEM1&courses[]=INFR11144_SV1_SEM1&show-close=1&show-close=1&period=SEM1'
		};
	}
});
</script>
