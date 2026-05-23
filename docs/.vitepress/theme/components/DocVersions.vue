<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme, site } = useData()

const globalTheme = computed(() => site.value?.themeConfig ?? {})
const rpfVersion = computed(() => theme.value?.rpfVersion ?? globalTheme.value?.rpfVersion ?? '')
const rptVersion = computed(() => theme.value?.rptVersion ?? globalTheme.value?.rptVersion ?? '')
const hasVersions = computed(() => Boolean(rpfVersion.value || rptVersion.value))
</script>

<template>
  <div v-if="hasVersions" class="rpf-rpt-versions" aria-label="Current RPF and RPT versions">
    <span v-if="rpfVersion" class="version-chip rpf">RPF {{ rpfVersion }}</span>
    <span v-if="rpfVersion && rptVersion" class="version-separator">/</span>
    <span v-if="rptVersion" class="version-chip rpt">RPT {{ rptVersion }}</span>
  </div>
</template>
