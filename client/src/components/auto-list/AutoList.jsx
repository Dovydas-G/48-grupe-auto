import { AutoCard } from './AutoCard';

export function AutoList() {
    return (
        <section className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
            </div>
        </section>
    );
}