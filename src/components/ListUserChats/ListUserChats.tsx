import { Avatar } from "@/components/Avatar";

const ListUserChats = () => {
  const listUses = [
    {
      id: 1,
      name: "Orbadiah",
      active: false,
      message: "Wemindji Airport",
      url: "http://dummyimage.com/157x100.png/ff4444/ffffff",
    },

    {
      id: 2,
      name: "Say",
      active: false,
      message: "Puerto Obaldia Airport",
      url: "http://dummyimage.com/181x100.png/5fa2dd/ffffff",
    },
    {
      id: 3,
      name: "Annetta",
      active: true,
      message: "Mokhotlong Airport",
      url: "http://dummyimage.com/138x100.png/dddddd/000000",
    },
    {
      id: 4,
      name: "Paulette",
      active: true,
      message: "Arorae Island Airport",
      url: "http://dummyimage.com/192x100.png/5fa2dd/ffffff",
    },
    {
      id: 5,
      name: "Abagail",
      active: true,
      message: "Bydgoszcz Ignacy Jan Paderewski Airport",
      url: "http://dummyimage.com/156x100.png/ff4444/ffffff",
    },
    {
      id: 6,
      name: "Tove",
      active: false,
      message: "Kithira Airport",
      url: "http://dummyimage.com/221x100.png/cc0000/ffffff",
    },
    {
      id: 7,
      name: "Mack",
      active: true,
      message: "Kwigillingok Airport",
      url: "http://dummyimage.com/229x100.png/ff4444/ffffff",
    },
    {
      id: 8,
      name: "Wolfy jjjjjjjjjjjjjjjjjjjjjj",
      active: false,
      message: "Gage Airport h",
      url: "http://dummyimage.com/191x100.png/dddddd/000000",
    },
    {
      id: 9,
      name: "Joelly",
      active: true,
      message: "Newtok Airport",
      url: "http://dummyimage.com/209x100.png/5fa2dd/ffffff",
    },
    {
      id: 10,
      name: "Quintus",
      active: true,
      message: "Mount Gunson Airport",
      url: "http://dummyimage.com/108x100.png/5fa2dd/ffffff",
    },
  ];
  return (
    <>
      {listUses.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2 p-4 hover:bg-light-400 rounded-md cursor-pointer"
        >
          <Avatar url={user.url} iconActive active={user.active} />
          <div className="flex flex-col">
            <h2 className="font-medium text-main-100">{user.name}</h2>
            <span className="text-sm text-main-300 text-main-200">
              {user.message}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListUserChats;
