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
                $mimeType        = $file -> getMimeType ();
                $fileSize        = $file -> getSize ();
                $url             = $file -> storeAs ( $path, $fileNameToStore );
                $filesArray[]    = [
                    'file_name' => $fileNameToStore,
                    'mime_type' => $mimeType,
                    'path'      => asset ( $url ),
                    'size'      => $fileSize,
                ];
            }
            
            return $filesArray;
        }
    }
