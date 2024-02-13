// Define interfaces to describe the structure of your JSON data
interface Engine {
  [key: string]: string; // You can adjust this according to the actual structure of your engine data
}

interface CarData {
  [key: string]: Engine;
}

interface TypeKey {
  [key: string]: CarData;
}

interface ModelKey {
  [key: string]: TypeKey;
}

interface BrandKey {
  [key: string]: ModelKey;
}

// Assuming your data has the following structure:
// const data: BrandKey = { ... };
import fs from 'fs';
import path from 'path'; // Import the path module to work with file paths
import getCars from './getCars';

const getDatabase = async () => {
  const data: BrandKey = JSON.parse(fs.readFileSync('url-list.json', 'utf-8'));

  for(const brandKey of Object.keys(data)) {
    console.log(`\n| ${brandKey}`)
    for(const modelKey of Object.keys(data[brandKey])) {
      console.log(`|-- ${modelKey}`)
      for(const typeKey of Object.keys(data[brandKey][modelKey])) {
        console.log(`|---- ${typeKey}`)
        for(const engineKey of Object.keys(data[brandKey][modelKey][typeKey])) {
          console.log(`|------ ${engineKey}`)
          for(const [key, value] of Object.entries(data[brandKey][modelKey][typeKey][engineKey])) {
            console.log(`|-------- ${key}`)
            const carData = await getCars(value);
            carData.brand = brandKey;
            carData.model = modelKey;

            // Construct the directory path
            const directoryPath = path.join('data', brandKey, modelKey, typeKey, engineKey);
            
            // Ensure that the directory path exists, creating directories recursively if necessary
            fs.mkdirSync(directoryPath, { recursive: true });

            // Construct the file path
            const filePath = path.join(directoryPath, `${key}.json`);

            // Write the data to the file
            fs.writeFileSync(filePath, JSON.stringify(carData));
          } 
        }
      }
    }
  }
}

export default getDatabase;