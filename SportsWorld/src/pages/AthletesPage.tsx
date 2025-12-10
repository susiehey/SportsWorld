import AthleteEdit from "../components/AthleteEdit";
import AthleteList from "../components/AthleteList";
import AthleteSearch from "../components/AthleteSearch";

{/*
Page 1. Administering athletes
Shows all registered athletes (purchased and not purchased). Search, edit and delete athlete.
*/}

export default function AthletesPage() {
    return (
        <>
            <section className="p-4">
                <p className="text-2xl font-bold">Athletes</p>
                <p className="mt-2 text-lg font-light">Manage your registered MMA athletes. Search, edit, and delete athletes as needed.</p>
            </section>

            <AthleteSearch></AthleteSearch>
            <AthleteEdit></AthleteEdit>
            <AthleteList></AthleteList>
        </>
    );
}

//Kommentar