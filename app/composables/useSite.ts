/** Site settings + copy blocks, fetched once and shared across components. */
export function useSite() {
  const { data } = useFetch('/api/site', { key: 'site', dedupe: 'defer' })

  const settings = computed(() => data.value?.settings ?? null)
  const content = computed(() => data.value?.content ?? {})

  return { settings, content }
}
