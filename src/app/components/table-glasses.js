import Table from 'react-bootstrap/Table';
import db from '../../../firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function GlassesTable() {
    const [glassesList, setGlasses] = useState([]);

    useEffect(() => {
        const fetchGlasses = async () => {
            try {
                const glassesCollection = collection(db, 'glasses');
                const glassesSnapshot = await getDocs(glassesCollection);
                const glassesList = glassesSnapshot.docs.map(doc => doc.data());
                console.log(glassesList);
                setGlasses(glassesList);
            } catch (error) {
                console.error("Error fetching glasses: ", error);
            }
        };

        fetchGlasses();
    }, []);

    return (
        <div className="container pt-4 col-md-6 align-items-center mx-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan="3">Glasses Inventory</th>
                        <th colSpan="4">Right Eye</th>
                        <th colSpan="4">Left Eye</th>
                    </tr>
                    <tr>
                        <th>Frame Color</th>
                        <th>Condition</th>
                        <th>Lens Type</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                        <th>Add</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
            {glassesList.map((glasses, index) => (
                <tr key={index}>
                    <td>{glasses.frameColor}</td>
                    <td>{glasses.condition}</td> 
                    <td>{glasses.lensType}</td>
                    <td>{glasses.rightEye.sphere}</td>
                    <td>{glasses.rightEye.cylinder}</td>
                    <td>{glasses.rightEye.axis}</td>
                    <td>{glasses.rightEye.add}</td>
                    <td>{glasses.leftEye.sphere}</td>
                    <td>{glasses.leftEye.cylinder}</td>
                    <td>{glasses.leftEye.axis}</td>
                    <td>{glasses.leftEye.add}</td>
                </tr>
            ))}
                </tbody>
            </Table>
        </div>
    );
}