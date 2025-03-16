
interface ListItemProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  title : string;
}

const ListItem: React.FC<ListItemProps> = ({ backgroundColor = '', textColor='text-black' ,padding = 'px-2' , title}) => {
    const RobotoFont = {
        fontFamily: "Roboto, sans-serif",
    }
  return (
    <li
        style={RobotoFont}
        className={`
            ${backgroundColor}
            ${textColor} ${padding}
            py-1.5 rounded-md hover:text-gray-400
            hover:cursor-pointer duration-300 font-roboto
        `}
    >
        {title}
    </li>
  );
}

export default ListItem
