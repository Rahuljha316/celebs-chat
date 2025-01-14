import { SignedIn, UserButton } from "@clerk/nextjs";

const RootPage = () => {
    return (
        <div>
            <SignedIn>
                <UserButton />
              </SignedIn>
        </div>
    )
}

export default RootPage;