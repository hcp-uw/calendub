import { useAuth } from 'context/AuthContext.tsx';

const ProfilePage = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Profile Page - Under Construction</h1>
            <h2>Welcome, {currentUser?.email}</h2>
        </div>
    );
}

export default ProfilePage;