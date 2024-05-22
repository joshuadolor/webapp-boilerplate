const fs = require('fs');
const path = require('path');

function copyDirectory(source, destination) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    // Get list of files and subdirectories in the source directory
    const files = fs.readdirSync(source);

    // Iterate over each file/subdirectory
    files.forEach(file => {
        // Construct paths for the current file/subdirectory
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);

        // Get stats for the current file/subdirectory
        const stats = fs.statSync(sourcePath);

        // Check if it's a file or directory
        if (stats.isFile()) {
            // If it's a file, copy it to the destination directory
            fs.copyFileSync(sourcePath, destinationPath);
        } else if (stats.isDirectory()) {
            // If it's a directory, recursively copy it
            copyDirectory(sourcePath, destinationPath);
        }
    });
}

// Extract command-line arguments
const args = process.argv.slice(2);

// Check if both source and destination arguments are provided
if (args.length !== 1) {
    console.error('Usage: node copy-shared.js <destination_directory>');
    process.exit(1);
}

// Get source and destination directory paths from command-line arguments
const sourceDir = "../shared";
const destinationDir = args[0]+"/shared";

// Copy the directory
copyDirectory(sourceDir, destinationDir);
