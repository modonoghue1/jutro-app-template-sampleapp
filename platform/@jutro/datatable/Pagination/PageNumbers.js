import React from"react";import PropTypes from"prop-types";import cx from"classnames";import{getVisiblePages}from"./utils";import{messages}from"./Pagination.messages";import styles from"./Pagination.module.css";import{PaginationSelect}from"./PaginationSelect";import{NavButton}from"./NavButton";export const PageNumbers=({id:id,numberOfRows:numberOfRows,pageSize:pageSize,onPageChange:onPageChange,page:page,canPrevious:canPrevious,canNext:canNext})=>{const totalPages=function(pageSize,totalRows){return Math.ceil(totalRows/pageSize)}(pageSize,numberOfRows),displayPageNumbers=totalPages>1,handleChangePage=newPage=>{newPage!==page&&onPageChange(newPage)},visiblePages=getVisiblePages(page,totalPages),visiblePagesButtons=React.createElement("div",{className:styles.pageButtonsWrapper},visiblePages.map(((visiblePage,index,visiblePages)=>{const displayDots=index!==visiblePages.length-1&&visiblePages[index+1]-visiblePage!=1,availableValues=[];if(displayDots)for(let i=visiblePages[index];i<visiblePages[index+1]-1;i+=1)availableValues.push({code:i,name:i+1});return React.createElement(React.Fragment,{key:visiblePage},React.createElement(NavButton,{onClick:()=>handleChangePage(visiblePage-1),className:cx({[styles.selectedPageButton]:page===visiblePage-1})},visiblePage),displayDots&&React.createElement(PaginationSelect,{id:`${id}-${visiblePage+1}`,onValueChange:target=>handleChangePage(Number(target)),availableValues:availableValues,displayValue:"..."}))})));return displayPageNumbers&&React.createElement("div",{className:styles.paginationNav,"data-testid":"pagination-nav"},canPrevious&&React.createElement(NavButton,{onClick:()=>handleChangePage(page-1),icon:"gw-chevron-left",iconPosition:"left"},messages.previous),visiblePagesButtons,canNext&&React.createElement(NavButton,{onClick:()=>handleChangePage(page+1),icon:"gw-chevron-right",iconPosition:"right"},messages.next))};PageNumbers.defaultProps={page:0},PageNumbers.propTypes={id:PropTypes.string.isRequired,canNext:PropTypes.bool,canPrevious:PropTypes.bool,page:PropTypes.number,numberOfRows:PropTypes.number.isRequired,pageSize:PropTypes.number.isRequired,onPageChange:PropTypes.func},PageNumbers.__docgenInfo={description:"",methods:[],displayName:"PageNumbers",props:{page:{defaultValue:{value:"0",computed:!1},type:{name:"number"},required:!1,description:"Current page"},id:{type:{name:"string"},required:!0,description:"Component unique identifier"},canNext:{type:{name:"bool"},required:!1,description:"If `true` 'nextNavButton' button is rendered"},canPrevious:{type:{name:"bool"},required:!1,description:"If `true` 'prevNavButton' button is rendered"},numberOfRows:{type:{name:"number"},required:!0,description:"Total rows number"},pageSize:{type:{name:"number"},required:!0,description:"Number of items per single page"},onPageChange:{type:{name:"func"},required:!1,description:"Callback used to handle page change"}}},PageNumbers.__docgenInfo={componentName:"PageNumbers",packageName:"@jutro/datatable",description:"",displayName:"PageNumbers",methods:[],actualName:"PageNumbers",props:{id:{type:{name:"string"},required:!0,description:"Component unique identifier"},canNext:{type:{name:"bool"},required:!1,description:"If `true` 'nextNavButton' button is rendered"},canPrevious:{type:{name:"bool"},required:!1,description:"If `true` 'prevNavButton' button is rendered"},page:{type:{name:"number"},required:!1,description:"Current page",defaultValue:{value:"0",computed:!1}},numberOfRows:{type:{name:"number"},required:!0,description:"Total rows number"},pageSize:{type:{name:"number"},required:!0,description:"Number of items per single page"},onPageChange:{type:{name:"func"},required:!1,description:"Callback used to handle page change"}}};