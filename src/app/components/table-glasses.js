import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import db, { storage } from '../../../firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

import { useEffect, useState } from 'react';

export default function GlassesTable() {
    const [glassesList, setGlasses] = useState([]);

    const imageStorageRef = ref(storage, 'images/glasses/');

    useEffect(() => {
        const fetchGlasses = async () => {
            try {
                const glassesCollection = collection(db, 'glasses');
                const glassesSnapshot = await getDocs(glassesCollection);
                const glassesList = await Promise.all(glassesSnapshot.docs.map(async function (doc) {
                    var glasses = doc.data();

                    glasses.imageUrl = null;
                    if (glasses.hasImage) {
                        const imageID = glasses.uuid + "_image";
                        const glassesImageRef = ref(storage, `images/glasses/${imageID}`);
                        try {
                            const url = await getDownloadURL(glassesImageRef);
                            glasses.imageUrl = url;
                        } catch (error) {
                            console.error("Image retrieval error", error.code);
                        }
                    } else {
                        glasses.imageUrl = null;
                    }
                    return glasses;
                }));
                console.log(glassesList);
                setGlasses(glassesList);
            } catch (error) {
                console.error("Error fetching glasses: ", error);
            }
        };

        fetchGlasses();
    }, []);

    return (
        <Container className="my-4 align-items-center mx-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan="4">Glasses Inventory</th>
                        <th colSpan="4">Left Eye</th>
                        <th colSpan="4">Right Eye</th>
                    </tr>
                    <tr>
                        <th>Image</th>
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
                    <td>
                        <img src={glasses.imageUrl} alt="Glasses" width={100} height={100} />
                    </td>
                    <td className="align-middle">{glasses.frameColor}</td>
                    <td className="align-middle">{glasses.condition}</td> 
                    <td className="align-middle">{glasses.lensType}</td>
                    <td className="align-middle">{glasses.leftEye.sphere}</td>
                    <td className="align-middle">{glasses.leftEye.cylinder}</td>
                    <td className="align-middle">{glasses.leftEye.axis}</td>
                    <td className="align-middle">{glasses.leftEye.add}</td>
                    <td className="align-middle">{glasses.rightEye.sphere}</td>
                    <td className="align-middle">{glasses.rightEye.cylinder}</td>
                    <td className="align-middle">{glasses.rightEye.axis}</td>
                    <td className="align-middle">{glasses.rightEye.add}</td>
                </tr>
            ))}
                </tbody>
            </Table>
        </Container>
    );
}