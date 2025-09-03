import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function EstimateForm({ initialData, onCancel, onSave }) {
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: "",
      items: [
        {
          id: Date.now() + 1,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
      ],
    },
  ]);

  // If editing, populate from initialData
  useEffect(() => {
    if (initialData && initialData.sections) {
      setSections(initialData.sections);
    }
  }, [initialData]);

  // Calculate item total
  const calculateItemTotal = (quantity, price, margin) => {
    const qty = Number(quantity || 0);
    const prc = Number(price || 0);
    const mrg = Number(margin || 0);
    const baseTotal = qty * prc;
    return baseTotal + (mrg / 100) * baseTotal;
  };

  // Handle item field changes
  const handleItemChange = (sectionId, itemId, field, value) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const updatedItems = section.items.map((item) => {
          if (item.id !== itemId) return item;

          const updatedItem = { ...item, [field]: value };

          // Recalculate total when quantity, price, or margin changes
          if (['quantity', 'price', 'margin'].includes(field)) {
            updatedItem.total = calculateItemTotal(
              updatedItem.quantity,
              updatedItem.price,
              updatedItem.margin
            );
          }

          return updatedItem;
        });

        return { ...section, items: updatedItems };
      })
    );
  };

  // Handle section title change
  const handleSectionChange = (sectionId, field, value) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, [field]: value } : s))
    );
  };

  // Add new section
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        items: [
          {
            id: Date.now() + 1,
            title: "",
            description: "",
            unit: "",
            quantity: "",
            price: "",
            margin: "",
            total: 0,
          },
        ],
      },
    ]);
  };

  // Remove section
  const removeSection = (sectionId) => {
    if (sections.length > 1) {
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    }
  };

  // Add item to section
  const addItem = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: [
              ...section.items,
              {
                id: Date.now(),
                title: "",
                description: "",
                unit: "",
                quantity: "",
                price: "",
                margin: "",
                total: 0,
              },
            ],
          }
          : section
      )
    );
  };

  // Remove item from section
  const removeItem = (sectionId, itemId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((i) => i.id !== itemId) }
          : section
      )
    );
  };

  // Calculate totals
  const calculateTotals = () => {
    const subTotal = sections.reduce(
      (sectionSum, section) =>
        sectionSum +
        section.items.reduce((itemSum, item) => itemSum + Number(item.total || 0), 0),
      0
    );

    const totalMargin = sections.reduce(
      (sectionSum, section) =>
        sectionSum +
        section.items.reduce((itemSum, item) => {
          const baseAmount = Number(item.quantity || 0) * Number(item.price || 0);
          return itemSum + (Number(item.margin || 0) / 100) * baseAmount;
        }, 0),
      0
    );

    return { subTotal, totalMargin, totalAmount: subTotal };
  };

  const { subTotal, totalMargin, totalAmount } = calculateTotals();

  // Submit handler
  const handleSubmit = () => {
    const estimateData = {
      sections,
      subTotal,
      totalMargin,
      totalAmount,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    onSave(estimateData);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
        {initialData ? "Edit Estimate" : "Add New Estimate"}
      </Typography>


      <Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 0 }}>
          {/* Single Table Header for all sections */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    ITEM
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    UNIT
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    QUANTITY
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    PRICE ($)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    MARGIN (+%)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>
                    TOTAL
                  </TableCell>
                  <TableCell sx={{ width: 100 }}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sections.map((section, sectionIndex) => (
                  <React.Fragment key={section.id}>
                    {/* Section Header Row */}
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell
                        colSpan={8}
                        sx={{
                          p: 2,
                          borderBottom: '1px solid #e0e0e0',
                          borderTop: sectionIndex > 0 ? '2px solid #e0e0e0' : 'none'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <Box sx={{
                              width: 24,
                              height: 24,
                              backgroundColor: '#000',
                              color: '#fff',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              mr: 2
                            }}>
                              {sectionIndex + 1}
                            </Box>
                            <TextField
                              placeholder="Sample Section"
                              value={section.title}
                              onChange={(e) => handleSectionChange(section.id, "title", e.target.value)}
                              variant="outlined"
                              size="small"
                              sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'transparent',
                                  '& fieldset': { border: 'none' },
                                  '&:hover fieldset': { border: '1px solid #1976d2' },
                                  '&.Mui-focused fieldset': { border: '1px solid #1976d2' }
                                }
                              }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: '#666', mr: 1 }}>
                              {section.items.reduce((sum, item) => sum + Number(item.total || 0), 0).toFixed(2)}
                            </Typography>
                            <Typography sx={{ color: '#999', mr: 2 }}>$</Typography>
                            <IconButton
                              onClick={addSection}
                              size="small"
                              sx={{
                                color: '#1976d2',
                                backgroundColor: '#e3f2fd',
                                '&:hover': { backgroundColor: '#bbdefb' },
                                width: 28,
                                height: 28
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                            {sections.length > 1 && (
                              <IconButton
                                onClick={() => removeSection(section.id)}
                                size="small"
                                sx={{
                                  color: '#d32f2f',
                                  backgroundColor: '#ffebee',
                                  '&:hover': { backgroundColor: '#ffcdd2' },
                                  width: 28,
                                  height: 28
                                }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Section Items */}
                    {section.items.map((item) => (
                      <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Item Name"
                            value={item.title}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "title", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Item Description"
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "description", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Unit"
                            value={item.unit}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "unit", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "quantity", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Price"
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "price", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <TextField
                            placeholder="Margin"
                            type="number"
                            value={item.margin}
                            onChange={(e) =>
                              handleItemChange(section.id, item.id, "margin", e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                fontSize: '14px',
                                '& fieldset': { borderColor: '#e0e0e0' }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0' }}>
                          <Typography sx={{ fontWeight: 500, color: '#333', textAlign: 'center' }}>
                            {item.total.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f0f0f0', p: 1 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <IconButton
                              onClick={() => addItem(section.id)}
                              size="small"
                              sx={{
                                color: '#1976d2',
                                backgroundColor: '#e3f2fd',
                                '&:hover': { backgroundColor: '#bbdefb' },
                                width: 24,
                                height: 24
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                            {section.items.length > 1 && (
                              <IconButton
                                onClick={() => removeItem(section.id, item.id)}
                                size="small"
                                sx={{
                                  color: '#d32f2f',
                                  backgroundColor: '#ffebee',
                                  '&:hover': { backgroundColor: '#ffcdd2' },
                                  width: 24,
                                  height: 24
                                }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Summary Section */}
          <Box sx={{ p: 4, backgroundColor: '#fff', borderTop: '1px solid #e0e0e0' }}>
            <Box sx={{ maxWidth: 400, ml: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Typography sx={{ color: '#666', fontSize: '14px' }}>Sub Total</Typography>
                <Typography sx={{ fontWeight: 500 }}>$ {subTotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Typography sx={{ color: '#666', fontSize: '14px' }}>Total Margin</Typography>
                <Typography sx={{ fontWeight: 500 }}>$ {totalMargin.toFixed(2)}</Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 2,
                borderTop: '2px solid #333',
                mt: 1
              }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Total Amount</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>$ {totalAmount.toFixed(2)}</Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                onClick={onCancel}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  textTransform: 'capitalize',
                  minWidth: 100
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: '#5470d6',
                  '&:hover': { backgroundColor: '#4058b8' },
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  minWidth: 100
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}