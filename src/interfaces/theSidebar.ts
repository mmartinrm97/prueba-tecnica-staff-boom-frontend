export interface NavItemInterface {
    href: string
    label: string
    icon: Component | null
    active: boolean
    children?: NavItemInterface[]
    quantity?: {
        value: number
    }
}