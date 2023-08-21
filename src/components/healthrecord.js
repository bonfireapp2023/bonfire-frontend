const data = [
    { age: 19, gender: "Male" },
    { age: 19, gender: "Female" },
    { age: 25, gender: "Male" },
]

const space_vertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const patientIdentification = {
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',
};

const HealthRecord = () => {
    return(
        <div>
            <h1>health records</h1>  
            <div style={patientIdentification}>
                name: <br/>
                age: <br/>
                email: <br/>
                phone: <br/>
                height: <br/>
                weight: <br/>
                bmi: <br/>
                allergies: <br/>
            </div>
            <div style={space_vertical}>
                <table>
                    <tr>
                        <th>Diagnosis</th>
                        <th>Medications</th>
                        <th>Treatments</th>
                        <th>Immunizations</th>
                        <th>Allergies</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.diagnosis}</td>
                                <td>{val.medications}</td>
                                <td>{val.treatments}</td>
                                <td>{val.immunizations}</td>
                                <td>{val.allergies}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
};

export default HealthRecord;