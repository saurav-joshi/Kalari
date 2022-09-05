import Modal from '@material-ui/core/Modal';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios'
import React, { useState } from 'react';


const FolderTreeModal = (props) => {

    const renderTree = (nodes) => (

        < TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>

            { Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem >
    );
    /*<FolderTreeModal
                open={openTreeModal}
                onClose={handleCloseTreeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                treeFolder={folderData}
            />*/


    const FileSystemNavigator = (jsonData) => {
        //let str = JSON.stringify(jsonData)
        //let jsonObj = JSON.parse(str)
        //console.log(jsonObj)
        //console.log(dirData)


        return (
            <TreeView

                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree(jsonData)}
            </TreeView>
        );
    }
    return (
        <div>
            <button type="button">
                Open Modal
      </button>

            <Modal
                {...props}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {props.treeFolder !== null ? FileSystemNavigator(props.treeFolder) : null}
                <br />
                <Button value="ok">Ok</Button>
                <Button onClick={props.onClose}>Cancel</Button>
            </Modal>
        </div>
    );
}

export default FolderTreeModal;