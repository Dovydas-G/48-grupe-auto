import { AutoCard } from "./AutoCard"
import style from "./AutoList.module.css"

export function AutoList () {
    return (
        <section className={style.autoList}>
            <h2>All AUTO SKELBIMŲ LIST CONTENT</h2>
            <AutoCard/>
            <AutoCard/>
            <AutoCard/>
            <AutoCard/>
            <AutoCard/>
            <AutoCard/>
            <AutoCard/>
        </section>
    )
}