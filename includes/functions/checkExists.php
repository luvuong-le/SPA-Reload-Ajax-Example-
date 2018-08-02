<?php 

    // Go through file directory and check if page exists
    $filename = "{$_POST['filepath']}-content.php";
    $dir = '../page-contents';

    if ($filename) {
        $files = scandir($dir);
        $files = array_slice($files, 2);
        
        foreach ($files as $file) {
            if ($file === $filename) {
               echo json_encode(array(
                   'success' => true
               ));
               die();
            }
        }
    }

    echo json_encode(array(
        'success' => false
    ));

    die();
?>