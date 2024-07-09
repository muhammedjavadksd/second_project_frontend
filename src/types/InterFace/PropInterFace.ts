
interface UserAuthStepInterFace {
    state: Function,
}

interface FundRaiseCreationStep {
    state: Function,
}

interface HomeBannerSlider {
    image: string,
    title: string,
    key: string | number
}

interface BreadCrumbInterFace {
    path: string[]
}

interface FundRaiseCreationBanner {
    image: string,
    title: string,
    subTitle: string
}

export type { UserAuthStepInterFace, HomeBannerSlider, BreadCrumbInterFace, FundRaiseCreationBanner, FundRaiseCreationStep }