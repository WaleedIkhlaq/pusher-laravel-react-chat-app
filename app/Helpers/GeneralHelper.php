<?php
    
    namespace App\Helpers;
    
    use Illuminate\Support\Facades\File;
    use Illuminate\Support\Str;
    
    class GeneralHelper {
        
        public function upload ( $request, $path = './uploads' ): array {
            File ::ensureDirectoryExists ( $path );
            
            $files      = $request -> file ( 'files' );
            $filesArray = [];
            
            foreach ( $files as $file ) {
                $extension       = $file -> getClientOriginalExtension ();
                $fileNameToStore = Str ::uuid () . '-' . time () . '.' . $extension;
                $url             = $file -> storeAs ( $path, $fileNameToStore );
                $filesArray[]    = asset ( $url );
            }
            
            return $filesArray;
        }
    }
