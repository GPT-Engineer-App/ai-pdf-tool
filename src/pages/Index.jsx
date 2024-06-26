// AI-Powered PDF Extraction, Conversion, and Translation Tool on IPFS
import { Box, Button, Container, Heading, Text, VStack, Image, Input, Textarea } from "@chakra-ui/react";
import { FaFilePdf, FaLanguage, FaUpload } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const extractPdfText = () => {
    const pdfUrl = file ? URL.createObjectURL(file) : "";
    const apiToken = "apify_api_tPg5PzZ9vFvCnQe5I05C1WpSmsxIWe2cNMsC";
    const actorUrl = `https://api.apify.com/v2/acts/jirimoravcik~pdf-text-extractor/runs?token=${apiToken}`;

    fetch(actorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: [pdfUrl] }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Extraction started successfully!", data);
        // Assuming the actual text is in a field named 'extractedText' in the response
        setExtractedText(data.extractedText);
      })
      .catch((error) => console.error("Error starting extraction:", error));
  };

  const extractText = () => {
    extractPdfText();
  };

  const convertToWord = () => {
    alert("Converted to Word format.");
  };

  const convertToExcel = () => {
    alert("Converted to Excel format.");
  };

  const convertToHTML = () => {
    alert("Converted to HTML format.");
  };

  const translateText = () => {
    setTranslatedText("Translated text from the PDF.");
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={8} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading mb={2}>AI-Powered PDF Tool</Heading>
          <Text fontSize="xl">Extract, convert, and translate PDF documents securely on IPFS.</Text>
          <Image src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzEzNDg5NTk2fDA&ixlib=rb-4.0.3&q=80&w=1080" borderRadius="md" mt={4} />
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading mb={2}>Upload PDF</Heading>
          <Text mb={4}>Select a PDF file to extract text, convert and translate.</Text>
          <Input type="file" accept=".pdf" p={2} onChange={handleFileChange} placeholder="Upload PDF" size="lg" />
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading mb={2}>Extracted Text</Heading>
          <Textarea value={extractedText} placeholder="Extracted text will appear here..." readOnly />
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading mb={2}>Convert & Translate</Heading>
          <VStack spacing={4}>
            <Button leftIcon={<FaFilePdf />} colorScheme="purple" variant="solid" onClick={convertToWord}>
              Convert to Word
            </Button>
            <Button leftIcon={<FaFilePdf />} colorScheme="purple" variant="solid" onClick={convertToExcel}>
              Convert to Excel
            </Button>
            <Button leftIcon={<FaFilePdf />} colorScheme="purple" variant="solid" onClick={convertToHTML}>
              Convert to HTML
            </Button>
            <Button leftIcon={<FaLanguage />} colorScheme="orange" variant="solid" onClick={translateText}>
              Translate Text
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
