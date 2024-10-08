
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

interface ITableKeyIndex {
    as: Function,
    key: string | string[]
}

interface ITableProps {
    headers: string[]
    searchKeys: string[]
    data: object[],
    keyIndex: ITableKeyIndex[],
}

interface IStaticCard {
    title: string
    statistic: string
    icon: React.ReactElement,
    bgClass?: string
}

interface ISliderComponent {
    children: React.ReactElement[],
    slidesToShow: number,
    slidesToScroll: number,
    dots: boolean,
    isGap: boolean,
    arrow: boolean
}

interface ISectionTitle {
    title: string
    focus_text: string,
    sub_title: string
}

interface IPaginationButton {
    onClick: Function,
    item_per_page: number,
    total_records: number
}


interface ILoadingComponent {
    isLoading: boolean,
    closeOnClick: boolean,
    children: React.ReactElement,
    paddingNeed: boolean
}

interface IListImageFile {
    data: string[]
    BASE_PATH: string,
    onClose: Function
}

interface IImageModel {
    imageURL: string,
    isOpen: boolean,
    onImageClose: Function,
    ZIndex: string
}

export type { IImageModel, IListImageFile, ILoadingComponent, IPaginationButton, ISectionTitle, ISliderComponent, IStaticCard, UserAuthStepInterFace, HomeBannerSlider, BreadCrumbInterFace, FundRaiseCreationBanner, FundRaiseCreationStep, ITableProps }