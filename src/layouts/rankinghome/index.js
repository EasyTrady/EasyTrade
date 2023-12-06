import React, { useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Form from 'components/common/Form'
import SoftInput from 'components/SoftInput'
import {
    Container, InputAdornment, Avatar, Icon, Stack, Typography, Dialog, MenuItem
} from '@mui/material'
import Breadcrumbs from 'examples/Breadcrumbs'
import SelectField from "components/common/SelectField";
import SoftBox from 'components/SoftBox'
import { useLocation } from 'react-router-dom'
import useControls from 'hooks/useControls'
import PropTypes from "prop-types";
import { navbarRow } from 'examples/Navbars/DashboardNavbar/styles'
import SoftButton from "components/SoftButton";
import { useTranslation } from 'react-i18next';
import SwitchIcon from 'examples/Icons/SwitchIcon'
import BrandIcon from 'examples/Icons/BrandIcon'
import SoftTypography from "components/SoftTypography";
import ViewIcon from 'examples/Icons/ViewIcon'
import DeleteIcon from 'examples/Icons/DeleteIcon'
import SpecialCategoryIcon from 'examples/Icons/SpecialCategoryIcon'
import BrannerIcon from 'examples/Icons/BrannerIcon'


import CategoryIcon from 'examples/Icons/CategoryIcon'
import StartIcon from 'examples/Icons/StartIcon'
import HeartIcon from 'examples/Icons/heartIcon'
import imageProduct from "assets/images/female.png"
import imageGrid from "assets/images/grid.png"
import imageScroll from "assets/images/scroll.png"


function index({ absolute, light, isMini }) {
    const route = useLocation().pathname.split("/").slice(1);
    let { t } = useTranslation("common")
    let [open, setOpen] = useState(false)
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const TypeItem = [{ icon: <BrandIcon />, title: "Brand" }, { icon: <SpecialCategoryIcon />, title: "special category" }, { icon: <CategoryIcon />, title: "category" }, { icon: <BrannerIcon />, title: "Banner" }]
    const brandfrom = [{ title: " top searched" }, { title: "top visited" }, { title: "last added " }]

    const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] =
        useControls([
            {
                control: "title",
                value: "",
                isRequired: true,

            },
            {
                control: "type",
                value: "",
                isRequired: false,

            },
            {
                control: "brandnumber",
                value: 0,
                isRequired: false,

            },
            {
                control: "brandform",
                value: "",
                isRequired: false,

            },
            {
                control: "section",
                value: "",
                isRequired: false,

            },
            {
                control: "presentation",
                value: "",
                isRequired: false,

            }, {
                control: "brannernumber",
                value: 0,
                isRequired: false,

            },
            {
                control: "brannerform",
                value: "",
                isRequired: false,

            },


        ]);
    return (
        <DashboardLayout >
            <DashboardNavbar />
            <Container sx={{ marginY: 2 }}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                <Stack direction={{ lg: "row", md: "column", sm: "column", xs: "column" }} justifyContent={"space-between"}>
                    <SoftBox sx={{ backgroundColor: "#fff", width: { lg: "40%", md: "100%", sm: "100%", xs: "100%" }, borderRadius: "8px", height: "100vh" }}>
                        <SoftBox sx={{ width: "100%", borderBottom: "1px solid ", padding: "16px" }}>
                            <SoftButton variant={"outlined"} onClick={() => setOpen(true)}
                                sx={{ borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}>
                                <Icon fontSize="small" on sx={{ color: ({ palette: { purple } }) => purple.middle }}>
                                    add
                                </Icon>
                                {t("Additem")}
                            </SoftButton>


                        </SoftBox>
                        <SoftBox sx={{ width: "100%", backgroundColor: "#fff", padding: "16px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <SoftBox sx={{ backgroundColor: "#F0F6FF", display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: "24px", paddingY: "10px", borderRadius: "8px", width: "75%" }}>
                                <SoftBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "60%" }}>
                                    <SwitchIcon />
                                    <BrandIcon />
                                    <Typography component="p" sx={{ fontSize: "14px", width: "100%" }}>sdjhefuhfeuifhwe</Typography>
                                </SoftBox>
                                <ViewIcon sx={{ width: "20%" }} />
                            </SoftBox>
                            <DeleteIcon sx={{ width: "20%" }} />
                        </SoftBox>

                    </SoftBox>
                    <SoftBox sx={{ backgroundColor: "#fff", width: "55%", borderRadius: "8px", overflow: "auto", height: "436px" }}>
                        <SoftBox sx={{ backgroundColor: "#e7eced8f", width: "100%", borderBottom: "1px solid ", display: "flex", padding: "10px" }}>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.error.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.warning.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>
                            <SoftTypography component="div" sx={{ backgroundColor: (theme) => theme.palette.success.main, width: "12px", height: "12px", borderRadius: "50%", marginX: "5px" }}></SoftTypography>

                        </SoftBox>
                        <SoftBox sx={{ padding: "10px" }}>
                            <SoftTypography component="div">{t("Categories")}</SoftTypography>
                            <SoftBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <SoftBox sx={{ borderRadius: "50%", border: "1.5px solid #D3D3D3", width: "80px", height: "80px" }}>

                                </SoftBox>
                                <SoftTypography component="div" sx={{ fontSize: "12px" }}>{t("Categories")}</SoftTypography>

                            </SoftBox>

                        </SoftBox>
                        <SoftBox sx={{ padding: "10px" }}>
                            <SoftTypography component="div">{t("Brands")}</SoftTypography>
                            <SoftBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <SoftBox sx={{
                                    borderRadius: "8px", border: "1px solid #D3D3D3",
                                    width: "20%", backgroundColor: "#fff", display: "flex", flexDirection: "column"
                                }}>


                                    <SoftBox sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                        <SoftTypography component={"img"} src={imageProduct} sx={{ width: "100%", height: "30px" }} />
                                    </SoftBox>
                                    <SoftBox sx={{
                                        display: "flex",
                                        justifyContent: "flex-start", flexDirection: "column", padding: "10px"
                                    }}>
                                        <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> Makeup</SoftTypography>
                                        <SoftTypography sx={{ fontSize: "8px" }}> Bourjois</SoftTypography>
                                        <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> 244+ items</SoftTypography>

                                    </SoftBox>

                                </SoftBox>
                                <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                    ...
                                </SoftBox>

                            </SoftBox>
                        </SoftBox>
                        <SoftBox sx={{ padding: "10px" }}>
                            <SoftTypography component="div">{t("Banner")}</SoftTypography>
                            <SoftBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                    ...
                                </SoftBox>
                                <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                    ...
                                </SoftBox>

                            </SoftBox>
                        </SoftBox>
                        <SoftBox sx={{ padding: "10px" }}>
                            <SoftTypography component="div">{t("Products")}</SoftTypography>
                            <SoftBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <SoftBox sx={{
                                    borderRadius: "8px", border: "1px solid #D3D3D3",
                                    width: "20%", backgroundColor: "#fff", display: "flex", flexDirection: "column"
                                }}>

                                    <SoftBox sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                        <SoftBox sx={{ border: "1px solid #8150A0", borderRadius: "24px", display: "Flex", alignItems: "center", justifyContent: "space-evenly", width: "40px", height: "10px" }}>
                                            <StartIcon />
                                            <SoftTypography sx={{ fontSize: "8px" }}>4.6</SoftTypography>
                                            <SoftTypography sx={{ fontSize: "8px", color: "gray" }}>(23)</SoftTypography>

                                        </SoftBox>
                                        <SoftBox>
                                            <HeartIcon />
                                        </SoftBox>

                                    </SoftBox>
                                    <SoftBox sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                        <SoftTypography component={"img"} src={imageProduct} sx={{ width: "50%", height: "50%" }} />
                                    </SoftBox>
                                    <SoftBox sx={{
                                        display: "flex",
                                        justifyContent: "flex-start", flexDirection: "column", padding: "10px"
                                    }}>
                                        <SoftTypography sx={{ fontSize: "8px", color: "gray" }}> Sports shoes</SoftTypography>
                                        <SoftTypography sx={{ fontSize: "8px" }}> Adidas running sn..</SoftTypography>
                                        <SoftTypography sx={{ fontSize: "8px", color: (theme) => theme.palette.error.main }}> 7,000 SAR</SoftTypography>

                                    </SoftBox>

                                </SoftBox>
                                <SoftBox sx={{ borderRadius: "8px", width: "50%", height: "80px" }}>
                                    ...
                                </SoftBox>

                            </SoftBox>
                        </SoftBox>

                    </SoftBox>
                </Stack>
            </Container>
            <Dialog open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ ".MuiPaper-root": { minWidth: "37%" }, }}>
                <Form component="form"
                    childrenProps={{
                        saveBtn: {
                            // onClick: handleSubmit,
                            // disabled: postjobResponce.isPending,
                        },
                        closeBtn: {
                            onClick: () => {
                                // handleClose()
                                // resetControls();
                                setOpen(false)
                            },
                            // disabled: postjobResponce.isPending,
                        },
                        title: t("Chooseitemtype")
                    }} sx={{
                        borderRadius: "8px", display: "flex",
                        flexDirection: "column"
                    }}>
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("title")}

                    </Typography>
                    <SoftInput
                        placeholder='title'
                        sx={{ ".MuiInputBase-root": { border: `1px solid !important`, borderColor: (theme) => theme.palette.grey[400] + "!important" }, }}
                        value={controls.title}
                        onChange={(e) => setControl("title", e.target.value)}
                        required={required.includes("title")}
                        error={Boolean(invalid?.title)}
                        helperText={invalid?.title}
                    // sx={input}
                    />
                    <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("Type")}

                    </Typography>
                    <SelectField
                        variant="outlined"
                        placeholder={"Export"}

                        // onOpen={getProducts}
                        value={controls.type}
                        onChange={(e) => setControl("type", e.target.value)}
                        renderValue={(selected) => {
                            console.log(selected)
                            return <SoftBox sx={{ display: "flex" }}>{selected.icon} {selected.title}</SoftBox>
                        }}
                        sx={{ width: "100% !important" }}
                    >
                        {
                            TypeItem?.map((product, index) => (
                                <MenuItem key={index} value={product}>{product.icon}{product.title}</MenuItem>
                            ))
                        }
                    </SelectField>
                    {controls.type.title == "Brand" && <>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Postion")}

                        </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton variant={"outlined"} sx={{ width: "49%", borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}   >
                                {t("fixed")}
                            </SoftButton>
                            <SoftButton variant={"outlined"} sx={{ width: "49%", borderColor: ({ palette: { purple } }) => purple.middle, color: ({ palette: { purple } }) => purple.middle }}>
                                {t("Scroll")}
                            </SoftButton>
                        </SoftBox>
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("brandsnumber")}

                        </Typography>
                        <SoftInput

                            value={controls.brandnumber}
                            //   disabled={brandnumber && !Boolean(brandnumber)}

                            onChange={(e) =>

                                Number(e.target.value) && setControl("brandnumber", e.target.value)
                            }
                        />
                        <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Choosebrandsfrom")}

                        </Typography>
                        <SelectField
                            variant="outlined"
                            placeholder={"Export"}

                            // onOpen={getProducts}
                            value={controls.brandform}
                            onChange={(e) => setControl("brandform", e.target.value)}
                            renderValue={(selected) => {
                                console.log(selected)
                                return <SoftBox sx={{ display: "flex" }}>{selected.title}</SoftBox>
                            }}
                            sx={{ width: "100% !important" }}
                        >
                            {
                                brandfrom?.map((product, index) => (
                                    <MenuItem key={index} value={product.title}>{product.title}</MenuItem>
                                ))
                            }
                        </SelectField>
                    </>}
                    {controls.type.title == "Banner" && <> <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                    >{t("Section")}

                    </Typography>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                            <SoftButton value={t("Single")} variant={"outlined"} onClick={(e) => setControl("section", e.target.value)} sx={{ width: "49%", borderColor: ({ palette: { grey } }) => grey[500], color: ({ palette: { grey } }) => grey[500] }}   >
                                <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "12px", marginX: "5px" }}></SoftTypography>
                                {t("Single")}
                            </SoftButton>
                            <SoftButton value={t("Multiple")} variant={"outlined"} onClick={(e) => setControl("section", e.target.value)} sx={{ width: "49%", borderColor: ({ palette: { grey } }) => grey[500], color: ({ palette: { grey } }) => grey[500] }}>
                                <SoftBox sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                                    <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "5px", marginX: "5px" }}></SoftTypography>
                                    <SoftTypography component="div" sx={{ border: ({ palette: { grey } }) => "1px solid" + grey[500], width: "20px", height: "5px", marginX: "5px" }}></SoftTypography>

                                </SoftBox>
                                {t("Multiple")}
                            </SoftButton>
                        </SoftBox>

                        {controls.section == "Multiple" && <><Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                        >{t("Presentation")}

                        </Typography><SoftBox sx={{ display: "flex", justifyContent: "space-between" }}>
                                <SoftButton variant={"outlined"} value={"Scroll"} onClick={(e) => setControl("presentation", e.target.value)} sx={{ width: "49%", borderColor: ({ palette: { grey } }) => grey[500], color: ({ palette: { grey } }) => grey[500] }}   >
                                    <SoftTypography component="img" src={imageScroll} sx={{ width: "20px", height: "10px", marginX: "5px" }}></SoftTypography>

                                    {t("Scroll")}
                                </SoftButton>
                                <SoftButton variant={"outlined"} value={"Grid"} onClick={(e) => setControl("presentation", e.target.value)} sx={{ width: "49%", borderColor: ({ palette: { grey } }) => grey[500], color: ({ palette: { grey } }) => grey[500] }}>

                                    <SoftTypography component="img" src={imageGrid} sx={{ width: "20px", height: "10px", marginX: "5px" }}></SoftTypography>


                                    {t("Grid")}
                                </SoftButton>
                            </SoftBox></>}
                        {controls.presentation == "Scroll" ? <>
                            <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("brannernumber")}

                            </Typography>
                            <SoftInput

                                value={controls.brannernumber}
                                //   disabled={brandnumber && !Boolean(brandnumber)}

                                onChange={(e) =>

                                    Number(e.target.value) && setControl("brannernumber", e.target.value)
                                }
                            />
                            <Typography variant={"label"} sx={{ display: "block", fontSize: "14px", }}
                            >{t("ChooseBanners")}

                            </Typography>
                            <SelectField
                                variant="outlined"
                                placeholder={"Export"}

                                // onOpen={getProducts}
                                value={controls.brandform}
                                onChange={(e) => setControl("brannerform", e.target.value)}
                                renderValue={(selected) => {
                                    console.log(selected)
                                    return <SoftBox sx={{ display: "flex" }}>{selected.title}</SoftBox>
                                }}
                                sx={{ width: "100% !important" }}
                            >
                                {
                                    brandfrom?.map((product, index) => (
                                        <MenuItem key={index} value={product.title}>{product.title}</MenuItem>
                                    ))
                                }
                            </SelectField>
                        </> : <></>}
                    </>}
                </Form>
            </Dialog>
        </DashboardLayout>
    )
}
export default index
index.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the index
index.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};