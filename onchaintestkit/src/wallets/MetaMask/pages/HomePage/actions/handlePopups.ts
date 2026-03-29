import type { Page } from "@playwright/test"
import { tryClickElement } from "../../../../../utils/tryClickElement"

type PopupConfigMap = {
  networkAdded: PopupConfig
  networkInfo: PopupConfig
  recoveryPhrase: PopupConfig
  generic: PopupConfig
}

type PopupConfig = {
  selector: string
  timeout?: number
}

export const popupConfigs: PopupConfigMap = {
  networkAdded: {
    selector: ".home__new-network-added__switch-to-button",
  },
  networkInfo: {
    selector: ".new-network-info__wrapper button.btn-primary",
  },
  recoveryPhrase: {
    selector: ".recovery-phrase-reminder button.btn-primary",
  },
  generic: {
    selector: '[data-testid="popover-close"]',
  },
} as const

export async function closePopup(page: Page, config: PopupConfig) {
  const { selector, timeout = 1000 } = config
  const buttonLocator = page.locator(selector)

  await tryClickElement(
    buttonLocator,
    async () => buttonLocator.isVisible(),
    timeout,
  )
}
