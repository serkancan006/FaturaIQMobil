import React from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Title,
  Divider,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvoiceService, {
  CreateInvoiceType,
  invoiceTypeEnum,
  scenarioTypeEnum,
} from "../../services/InvoiceService";

// Validation schema
export const CreateInvoiceValidationSchema = Yup.object({
  receiverTaxNumber: Yup.string()
    .required("Vergi numarası zorunludur")
    .min(10, "Vergi numarası en az 10 karakter olmalıdır")
    .max(11, "Vergi numarası en fazla 11 karakter olabilir"),

  kdvRate: Yup.number()
    .typeError("KDV oranı sayısal olmalıdır")
    .required("KDV oranı zorunludur"),

  withholdingRate: Yup.number()
    .typeError("Tevkifat oranı sayısal olmalıdır")
    .required("Tevkifat oranı zorunludur"),

  discountRate: Yup.number()
    .typeError("İskonto oranı sayısal olmalıdır")
    .required("İskonto oranı zorunludur"),

  scenarioType: Yup.mixed<scenarioTypeEnum>()
    .oneOf(Object.values(scenarioTypeEnum), "Geçerli bir senaryo tipi seçin")
    .required("Senaryo tipi zorunludur"),

  invoiceType: Yup.mixed<invoiceTypeEnum>()
    .oneOf(Object.values(invoiceTypeEnum), "Geçerli bir fatura tipi seçin")
    .required("Fatura tipi zorunludur"),

  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Ürün adı zorunludur"),
        description: Yup.string().required("Açıklama zorunludur"),
        quantity: Yup.number()
          .typeError("Miktar sayısal olmalıdır")
          .required("Miktar zorunludur"),
        unitPrice: Yup.number()
          .typeError("Birim fiyatı sayısal olmalıdır")
          .required("Birim fiyatı zorunludur"),
      })
    )
    .min(1, "En az bir ürün girmelisiniz"),
});

const InvoiceCreatePage = () => {
  const onSubmit = async (values: CreateInvoiceType, actions: any) => {
    const response = await InvoiceService.createInvoice(values);
    if (response.status === 200) {
      Alert.alert("Başarılı", "Fatura başarıyla oluşturuldu.");
      actions.resetForm();
    }
  };

  const formik = useFormik<CreateInvoiceType>({
    initialValues: {
      receiverTaxNumber: "",
      discountRate: null,
      kdvRate: null,
      withholdingRate: null,
      items: [
        {
          name: "",
          description: "",
          quantity: null,
          unitPrice: null,
        },
      ],
      invoiceType: null,
      scenarioType: null,
    },
    validationSchema: CreateInvoiceValidationSchema,
    onSubmit,
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Title>Fatura Oluştur</Title>

      {/* Vergi Numarası */}
      <TextInput
        label="Vergi Numarası"
        mode="outlined"
        onChangeText={formik.handleChange("receiverTaxNumber")}
        onBlur={formik.handleBlur("receiverTaxNumber")}
        value={formik.values.receiverTaxNumber}
        error={
          !!formik.errors.receiverTaxNumber && formik.touched.receiverTaxNumber
        }
      />
      <HelperText
        type="error"
        visible={
          !!formik.errors.receiverTaxNumber && formik.touched.receiverTaxNumber
        }
      >
        {formik.errors.receiverTaxNumber}
      </HelperText>

      {/* KDV Oranı */}
      <TextInput
        label="KDV Oranı (0 - 1)"
        mode="outlined"
        keyboardType="numeric"
        onChangeText={formik.handleChange("kdvRate")}
        onBlur={formik.handleBlur("kdvRate")}
        value={formik.values.kdvRate?.toString() || ""}
        error={!!formik.errors.kdvRate && formik.touched.kdvRate}
      />
      <HelperText
        type="error"
        visible={!!formik.errors.kdvRate && formik.touched.kdvRate}
      >
        {formik.errors.kdvRate}
      </HelperText>

      {/* Stopaj Oranı */}
      <TextInput
        label="Stopaj Oranı (0 - 1)"
        mode="outlined"
        keyboardType="numeric"
        onChangeText={formik.handleChange("withholdingRate")}
        onBlur={formik.handleBlur("withholdingRate")}
        value={formik.values.withholdingRate?.toString() || ""}
        error={
          !!formik.errors.withholdingRate && formik.touched.withholdingRate
        }
      />
      <HelperText
        type="error"
        visible={
          !!formik.errors.withholdingRate && formik.touched.withholdingRate
        }
      >
        {formik.errors.withholdingRate}
      </HelperText>

      {/* İskonto Oranı */}
      <TextInput
        label="İskonto Oranı (0 - 1)"
        mode="outlined"
        keyboardType="numeric"
        onChangeText={formik.handleChange("discountRate")}
        onBlur={formik.handleBlur("discountRate")}
        value={formik.values.discountRate?.toString() || ""}
        error={!!formik.errors.discountRate && formik.touched.discountRate}
      />
      <HelperText
        type="error"
        visible={!!formik.errors.discountRate && formik.touched.discountRate}
      >
        {formik.errors.discountRate}
      </HelperText>

      {/* Fatura Tipi */}
      <TextInput
        label="Fatura Tipi (ALIS, SATIS, IADE)"
        mode="outlined"
        onChangeText={formik.handleChange("invoiceType")}
        onBlur={formik.handleBlur("invoiceType")}
        value={formik.values.invoiceType || ""}
        error={!!formik.errors.invoiceType && formik.touched.invoiceType}
      />
      <HelperText
        type="error"
        visible={!!formik.errors.invoiceType && formik.touched.invoiceType}
      >
        {formik.errors.invoiceType}
      </HelperText>

      {/* Senaryo Tipi */}
      <TextInput
        label="Senaryo Tipi (Temel, Ticari)"
        mode="outlined"
        onChangeText={formik.handleChange("scenarioType")}
        onBlur={formik.handleBlur("scenarioType")}
        value={formik.values.scenarioType || ""}
        error={!!formik.errors.scenarioType && formik.touched.scenarioType}
      />
      <HelperText
        type="error"
        visible={!!formik.errors.scenarioType && formik.touched.scenarioType}
      >
        {formik.errors.scenarioType}
      </HelperText>

      <Divider style={{ marginVertical: 10 }} />
      <Title style={{ fontSize: 18 }}>Ürünler</Title>

      {/* Ürünler */}
      {formik.values.items.map((item, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          {/* Ürün Adı */}
          <TextInput
            label={`Ürün Adı ${index + 1}`}
            mode="outlined"
            onChangeText={formik.handleChange(`items[${index}].name`)}
            onBlur={formik.handleBlur(`items[${index}].name`)}
            value={item.name || ""}
            error={
              !!formik.errors.items?.[index]?.name &&
              formik.touched.items?.[index]?.name
            }
          />
          <HelperText
            type="error"
            visible={
              !!formik.errors.items?.[index]?.name &&
              formik.touched.items?.[index]?.name
            }
          >
            {formik.errors.items?.[index]?.name}
          </HelperText>

          {/* Açıklama */}
          <TextInput
            label={`Açıklama ${index + 1}`}
            mode="outlined"
            onChangeText={formik.handleChange(`items[${index}].description`)}
            onBlur={formik.handleBlur(`items[${index}].description`)}
            value={item.description || ""}
            error={
              !!formik.errors.items?.[index]?.description &&
              formik.touched.items?.[index]?.description
            }
          />
          <HelperText
            type="error"
            visible={
              !!formik.errors.items?.[index]?.description &&
              formik.touched.items?.[index]?.description
            }
          >
            {formik.errors.items?.[index]?.description}
          </HelperText>

          {/* Miktar */}
          <TextInput
            label={`Miktar ${index + 1}`}
            mode="outlined"
            keyboardType="numeric"
            onChangeText={formik.handleChange(`items[${index}].quantity`)}
            onBlur={formik.handleBlur(`items[${index}].quantity`)}
            value={item.quantity?.toString() || ""}
            error={
              !!formik.errors.items?.[index]?.quantity &&
              formik.touched.items?.[index]?.quantity
            }
          />
          <HelperText
            type="error"
            visible={
              !!formik.errors.items?.[index]?.quantity &&
              formik.touched.items?.[index]?.quantity
            }
          >
            {formik.errors.items?.[index]?.quantity}
          </HelperText>

          {/* Birim Fiyat */}
          <TextInput
            label={`Birim Fiyat ${index + 1}`}
            mode="outlined"
            keyboardType="numeric"
            onChangeText={formik.handleChange(`items[${index}].unitPrice`)}
            onBlur={formik.handleBlur(`items[${index}].unitPrice`)}
            value={item.unitPrice?.toString() || ""}
            error={
              !!formik.errors.items?.[index]?.unitPrice &&
              formik.touched.items?.[index]?.unitPrice
            }
          />
          <HelperText
            type="error"
            visible={
              !!formik.errors.items?.[index]?.unitPrice &&
              formik.touched.items?.[index]?.unitPrice
            }
          >
            {formik.errors.items?.[index]?.unitPrice}
          </HelperText>
        </View>
      ))}

      {/* Form Submit */}
      <Button mode="contained" onPress={formik.handleSubmit}>
        Fatura Oluştur
      </Button>
    </ScrollView>
  );
};

export default InvoiceCreatePage;
