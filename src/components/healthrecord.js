import React from "react";
import {Card, CardBody} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const patient = [
    {
      key: "1",
      name: "Tony Stark",
      age: 53,
      height: "6'1",
      weight: "185",
      allergies: "Peanuts, Grass Pollen",
    },
]

const info = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "age",
    label: "AGE",
  },
  {
    key: "height",
    label: "HEIGHT",
  },
  {
    key: "weight",
    label: "WEIGHT",
  },
  {
    key: "allergies",
    label: "ALLERGIES",
  },
]

const contacts = [
  {
    key: "1",
    number: "123-123-1234",
    emergencycontact: "Pepper Potts",
    emergencycontactnumber: "123-456-5678"
  },
]

const contactskeys = [
  {
    key: "number",
    label: "NUMBER",
  },
  {
    key: "emergencycontact",
    label: "EMERGENCY CONTACT",
  },
  {
    key: "emergencycontactnumber",
    label: "EMERGENCY CONTACT NUMBER",
  },
]

const rows = [
  {
    key: "1",
    date: "1/1/2023",
    diagnosis: "Gastroenteritis (Stomach Flu)",
    symptoms: "Nausea, vomiting, diarrhea, abdominal cramps",
    treatment: "Ondansetron 4mg for nausea (as needed), Loperamide 2mg for diarrhea (as directed).",
  },
  {
    key: "2",
    date: "1/23/2023",
    diagnosis: "Sprained Ankle",
    symptoms: "Swelling, pain, limited range of motion",
    treatment: "Ibuprofen 400mg every 6 hours for pain and inflammation.",
  },
  {
    key: "3",
    date: "2/2/2023",
    diagnosis: "Acute Sinusitis",
    symptoms: "Facial pain, nasal congestion, postnasal drip, headache",
    treatment: "Amoxicillin 500mg, 3 times a day for 10 days.",
  },
];
  
const columns = [
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "diagnosis",
    label: "PAST DIAGNOSIS",
  },
  {
    key: "symptoms",
    label: "SYMPTOMS",
  },
  {
    key: "treatment",
    label: "TREATMENT",
  },
];

const current = [
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "diagnosis",
    label: "CURRENT DIAGNOSIS",
  },
  {
    key: "symptoms",
    label: "SYMPTOMS",
  },
  {
    key: "treatment",
    label: "TREATMENT",
  },
];

const currentrows = [
  {
    key: "1",
    date: "8/21/2023",
    diagnosis: "Post-traumatic stress disorder",
    symptoms: "Nightmares involving the traumatic event and avoidance of places that reminded him of the event",
    treatment: "SSRIs and therapy",
  },
];


const space_horizontal = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    margin: 10,
};


const HealthRecord = () => {
    return(
        <div>
            <div style={{margin:10,}}>
            <Card>
                    <CardBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={info}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={patient}>
                                {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={contactskeys}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={contacts}>
                                {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={current}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={currentrows}>
                                {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={rows}>
                                {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HealthRecord;