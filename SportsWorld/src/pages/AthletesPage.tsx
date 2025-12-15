import AthleteEdit from "../components/athletes/AthleteEdit";
import AthleteList from "../components/athletes/AthleteList";
import AthleteSearch from "../components/athletes/AthleteSearch";

{/*
Page 1. Administering athletes
Shows all registered athletes (purchased and not purchased). Search, edit and delete athlete.
*/}

export default function AthletesPage() {
    return (
        <>
            <section className="p-4 text-center">
                <p className="mb-2 text-2xl font-bold">
                    Athletes
                </p>
                <p className="mb-4 text-lg font-light">
                    Manage your registered MMA athletes. Search, edit, and delete athletes as needed.
                </p>
            </section>

            <section className="px-4 pb-8 flex justify-center">
                <div className="w-full max-w-5xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <AthleteEdit></AthleteEdit>
                        <AthleteSearch></AthleteSearch>
                    </div>
                    <div className="mt-4">
                        <AthleteList></AthleteList>
                    </div>
                </div>
            </section>
        </>
    );
}

//Kommentar