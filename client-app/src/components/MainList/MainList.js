import './MainList.css'

const Mainlist = ({links, goToPage}) => {
    return (
        <div className='task-list-container'>
            <div className='tab-cards'>
                {links.map((link) => (
                    <div
                        key={link.path}
                        className='tab-card'
                        onClick={() => goToPage(link.path)}
                    >
                        <h4>{link.label}</h4>
                        <p>{link.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mainlist;