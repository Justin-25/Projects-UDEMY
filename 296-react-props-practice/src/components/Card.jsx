export function Card({ contacts }) {
  return (
    <>
      <h1 className="heading">My Contacts</h1>
      {contacts.map((contact) => {
        return (
          <div key={contact.id} className="card">
            <div className="top">
              <h2 className="name">{contact.name}</h2>
              <img
                className="circle-img"
                src={contact.imgURL}
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">{contact.phone}</p>
              <p className="info">{contact.email}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
