import { Fragment } from "react";

export default function TableGroup({ title, headers, data, onChange }) {
    return (
        <table className="w-full mt-5">
            <thead>
                <tr className="bg-blue-200 text-gray-900">
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="border border-gray-300 p-3"
                            colSpan={index === 1 ? 1 : 1} // กำหนดขนาดตามที่ต้องการ
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((group, groupIndex) => (
                    <Fragment key={groupIndex}>
                        <tr className="bg-blue-100 font-bold">
                            <td className="border border-gray-300 p-3" colSpan={headers.length}>{group.category}</td>
                        </tr>
                        {group.questions.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-3">{item.question}</td>
                                {[...Array(headers.length - 2)].map((_, i) => (
                                    <td key={i} className="border border-gray-300 p-3 text-center">
                                        <input
                                            type="radio"
                                            name={`q${groupIndex}-${index}`}
                                            value={i + 1}
                                            onChange={(e) => onChange(groupIndex, index, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
}