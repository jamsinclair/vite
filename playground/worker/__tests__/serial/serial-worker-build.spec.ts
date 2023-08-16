import { describe, expect, test } from 'vitest'
import { isBuild, page, untilUpdated } from '~utils'

describe.runIf(isBuild)('build', () => {
  test('expect the plugin state to be polluted and not match across worker builds', async () => {
    await untilUpdated(
      () => page.textContent('.nested-worker-plugin-state'),
      '"type":"plugin-state"',
      true,
    )
    await untilUpdated(
      () => page.textContent('.sub-worker-plugin-state'),
      '"type":"plugin-state-sub"',
      true,
    )

    const nestedWorkerPluginState = JSON.parse(
      await page.textContent('.nested-worker-plugin-state'),
    )
    const subWorkerPluginState = JSON.parse(
      await page.textContent('.sub-worker-plugin-state'),
    )

    expect(nestedWorkerPluginState).not.toEqual(subWorkerPluginState)
  })
})
