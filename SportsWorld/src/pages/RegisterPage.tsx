import AthleteAdd from "../components/register/AthleteAdd";

{ /*
Page 2. Register potential athletes
Registering a new potential athlete. When you first register the athlete, they have status of “not purchased” as default.
*/ }

export default function RegisterPage() {
    return (
        <>
            <section className="p-4">
                <p className="mb-2 text-2xl font-bold">
                    Register athletes
                </p>
                <p className="text-lg font-light">
                    Register new MMA athletes here.
                </p>
            </section>

            <AthleteAdd></AthleteAdd>
        </>
    );
}