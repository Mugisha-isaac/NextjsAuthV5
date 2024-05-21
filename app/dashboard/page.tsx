import { auth } from "../auth/auth";
import { signOut } from "../auth/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
        {JSON.stringify(session)}
        <form action={async () =>{
            await signOut();
        }}>
         <button type="submit"> Sign Out</button>
        </form>
    </div>
  );
}
