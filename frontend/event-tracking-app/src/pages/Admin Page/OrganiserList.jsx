import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function OrganiserList(props){
    const navigate=useNavigate()
    const {organisers}=useSelector((state)=>{
        return state.users;
    })

    return (
        <div>
            <button onClick={() => navigate("/dashboard")} className="mb-3 px-4 py-2 border border-black">
                ← Back to Dashboard
            </button>
            <table className="border border-black border-collapse">
                <thead>
                    <tr className="border border-black p-3">
                        <th className="border border-black p-3">Organiser Name</th>
                        <th className="border border-black p-3">Organiser Email</th>
                        <th className="border border-black p-3">Events Organised</th>
                    </tr>
                </thead>
                <tbody>
                    {organisers.map((ele)=>{
                        return <tr key={ele._id}>
                            <td className="border border-black p-3">{ele.name}</td>
                            <td className="border border-black p-3">{ele.email}</td>
                            <td className="border border-black p-3">{ele.eventsOrganised}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}