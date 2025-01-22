import { FaInstagram, FaLink } from 'react-icons/fa';
import { User } from 'types/User';
import './ProfileCard.css';

interface ProfileCardProps {
  userInformation: User | undefined;
}

const ProfileCard = (props: ProfileCardProps) => {
  const user = props.userInformation;

  if (!user) {
    return <div>throw 404: username not found</div>;
  }

  return (
    <div className="profile-card card">
      <span>
        <img className="profile-image" src={user.image}></img>
        <div className="profile-name">
          <h2>{user.name}</h2>
          <p>
            <b>@{user.username}</b>
          </p>
        </div>
      </span>
      <p>{user.bio}</p>
      <span>
        {user.socials.instagram && (
          <a
            href={`https://www.instagram.com/${user.socials.instagram}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={20} />
          </a>
        )}
        {user.socials.url && (
          <a href={user.socials.url} target="_blank" rel="noreferrer">
            <FaLink size={20} />
          </a>
        )}
        <button className="follow-button">Follow</button>
      </span>
    </div>
  );
};

export default ProfileCard;
