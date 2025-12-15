{ /*
Page 2. Register potential athletes
Registering a new potential athlete. When you first register the athlete, they have status of “not purchased” as default.
*/ }
import AthleteAdd from "../components/register/AthleteAdd";

export default function RegisterPage() {
    return (
        <>
            <section className="p-4 text-center">
                <p className="mb-2 text-2xl font-bold">
                    Register athletes
                </p>
                <p className="mb-4 text-lg font-light">
                    Register new MMA athletes here.
                </p>
            </section>

            <section className="px-4 pb-8 flex justify-center">
                <div className="w-full max-w-2xl">
                    <AthleteAdd></AthleteAdd>
                </div>
            </section>
           
        </>
    );
}