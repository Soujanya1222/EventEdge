import { useSelector } from "react-redux"
export default function OrganiserList(props){
    const {data:organiser}=useSelector((state)=>{
        return state.users;
    })

    return (
        <div>
            <table className="border border-black border-collapse">
                <thead>
                    <tr className="border border-black p-3">
                        <th className="border border-black p-3">Organiser Name</th>
                        <th className="border border-black p-3">Organiser Email</th>
                        <th className="border border-black p-3">Events Organised</th>
                        <th className="border border-black p-3">Tickets Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {organiser.map((ele)=>{
                        return <tr key={ele._id}>
                            <td className="border border-black p-3">{ele.name}</td>
                            <td className="border border-black p-3">{ele.email}</td>
                            <td className="border border-black p-3">{ele.eventsOrganised}</td>
                            <td className="border border-black p-3">{ele.ticketsSold}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}